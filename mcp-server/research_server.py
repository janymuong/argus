import arxiv
import json
import mimetypes
import os
import uuid
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Dict, List
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

PAPER_DIR = "papers"
BACKEND_GRAPHQL_URL = os.getenv(
        "ARGUS_GRAPHQL_URL", "http://127.0.0.1:8000/graphql/"
)
PREDICT_MUTATION = """
mutation Predict($file: Upload!) {
    predict(image: $file) {
        __typename
        ... on PredictionResult {
            predictedClass
            confidence
            allProbabilities {
                label
                probability
            }
        }
        ... on PredictionError {
            message
        }
    }
}
"""

@dataclass
class ConversationHistory:
    """Class to maintain conversation state and history"""
    messages: List[Dict] = field(default_factory=list)
    last_papers: List[Dict] = field(default_factory=list)
    
    def add_user_message(self, message: str):
        self.messages.append({
            'role': 'user',
            'content': message,
            'timestamp': datetime.now().isoformat()
        })
    
    def add_system_message(self, message: str):
        self.messages.append({
            'role': 'system',
            'content': message,
            'timestamp': datetime.now().isoformat()
        })
    
    def set_last_papers(self, papers: List[Dict]):
        self.last_papers = papers
    
    def get_last_papers(self) -> List[Dict]:
        return self.last_papers
    
    def get_recent_messages(self, limit: int = 5) -> List[Dict]:
        return self.messages[-limit:]

# Initialize FastMCP server
mcp = FastMCP("research")
conversation = ConversationHistory()

@mcp.tool()
def search_papers(topic: str, max_results: int = 5) -> List[str]:
    """
    Search for papers on arXiv based on a topic and store their information.
    
    Args:
        topic: The topic to search for
        max_results: Maximum number of results to retrieve (default: 5)
        
    Returns:
        List of paper IDs found in the search
    """
    
    # Use arxiv to find the papers 
    client = arxiv.Client()

    # Search for the most relevant articles matching the queried topic
    search = arxiv.Search(
        query = topic,
        max_results = max_results,
        sort_by = arxiv.SortCriterion.Relevance
    )

    papers = client.results(search)
    
    # Create directory for this topic
    path = os.path.join(PAPER_DIR, topic.lower().replace(" ", "_"))
    os.makedirs(path, exist_ok=True)
    
    file_path = os.path.join(path, "papers_info.json")

    # Try to load existing papers info
    try:
        with open(file_path, "r") as json_file:
            papers_info = json.load(json_file)
    except (FileNotFoundError, json.JSONDecodeError):
        papers_info = {}

    # Process each paper and add to papers_info  
    paper_ids = []
    found_papers = []
    for paper in papers:
        paper_id = paper.get_short_id()
        paper_ids.append(paper_id)
        paper_info = {
            'id': paper_id,
            'title': paper.title,
            'authors': [author.name for author in paper.authors],
            'summary': paper.summary,
            'pdf_url': paper.pdf_url,
            'published': str(paper.published.date())
        }
        papers_info[paper_id] = paper_info
        found_papers.append(paper_info)
    
    # Save updated papers_info to json file
    with open(file_path, "w") as json_file:
        json.dump(papers_info, json_file, indent=2)
    
    # Update conversation history with found papers
    conversation.set_last_papers(found_papers)
    
    print(f"Results are saved in: {file_path}")
    return paper_ids

@mcp.tool()
def extract_info(paper_id: str) -> str:
    """
    Search for information about a specific paper across all topic directories.
    
    Args:
        paper_id: The ID of the paper to look for
        
    Returns:
        JSON string with paper information if found, error message if not found
    """
    # First check in conversation history
    for paper in conversation.get_last_papers():
        if paper['id'] == paper_id:
            return json.dumps(paper, indent=2)
 
    # If not found in history, search in files
    for item in os.listdir(PAPER_DIR):
        item_path = os.path.join(PAPER_DIR, item)
        if os.path.isdir(item_path):
            file_path = os.path.join(item_path, "papers_info.json")
            if os.path.isfile(file_path):
                try:
                    with open(file_path, "r") as json_file:
                        papers_info = json.load(json_file)
                        if paper_id in papers_info:
                            return json.dumps(papers_info[paper_id], indent=2)
                except (FileNotFoundError, json.JSONDecodeError) as e:
                    print(f"Error reading {file_path}: {str(e)}")
                    continue
    
    return f"There's no saved information related to paper {paper_id}."

@mcp.tool()
def get_last_papers() -> str:
    """
    Get information about the papers from the last search.
    
    Returns:
        JSON string containing paper information
    """
    papers = conversation.get_last_papers()
    return json.dumps(papers if papers else [])


@mcp.tool()
def predict_retina_image(image_path: str) -> Dict[str, object]:
    """
    Send a local fundus image to the Argus GraphQL backend and return the
    predicted DR class plus confidence breakdown.

    Args:
        image_path: Local filesystem path to a retinal fundus image.

    Returns:
        JSON-serializable dictionary containing the GraphQL response.
    """

    path = Path(image_path).expanduser().resolve()
    if not path.is_file():
        return {
            "ok": False,
            "error": f"Image file not found: {path}",
        }

    mime_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    boundary = f"----ArgusMCP{uuid.uuid4().hex}"

    operations = json.dumps({"query": PREDICT_MUTATION, "variables": {"file": None}})
    mapping = json.dumps({"0": ["variables.file"]})
    file_bytes = path.read_bytes()

    body = b"".join(
        [
            f"--{boundary}\r\n".encode(),
            b'Content-Disposition: form-data; name="operations"\r\n',
            b"Content-Type: application/json\r\n\r\n",
            operations.encode(),
            b"\r\n",
            f"--{boundary}\r\n".encode(),
            b'Content-Disposition: form-data; name="map"\r\n',
            b"Content-Type: application/json\r\n\r\n",
            mapping.encode(),
            b"\r\n",
            f"--{boundary}\r\n".encode(),
            f'Content-Disposition: form-data; name="0"; filename="{path.name}"\r\n'.encode(),
            f"Content-Type: {mime_type}\r\n\r\n".encode(),
            file_bytes,
            b"\r\n",
            f"--{boundary}--\r\n".encode(),
        ]
    )

    request = Request(
        BACKEND_GRAPHQL_URL,
        data=body,
        headers={
            "Accept": "application/json",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
        method="POST",
    )

    try:
        with urlopen(request, timeout=30) as response:
            response_payload = json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        return {"ok": False, "error": f"Backend returned HTTP {exc.code}"}
    except URLError as exc:
        return {"ok": False, "error": f"Could not reach Argus backend: {exc.reason}"}
    except json.JSONDecodeError:
        return {"ok": False, "error": "Backend returned invalid JSON."}

    if response_payload.get("errors"):
        return {
            "ok": False,
            "error": response_payload["errors"][0].get("message", "Prediction failed."),
        }

    prediction = response_payload.get("data", {}).get("predict")
    if not prediction:
        return {"ok": False, "error": "Prediction payload was empty."}

    return {
        "ok": True,
        "source_image": str(path),
        "prediction": prediction,
    }

if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport='stdio')