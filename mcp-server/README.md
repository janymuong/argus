## Argus MCP server

This directory contains the MCP side of the project.

## Virtual environment

Use the single repo-root Python environment. Both Django and MCP share the same
dependencies now, so there is no separate MCP-only venv.

### Setup the shared env

```bash
cd /home/detonov/Projects/argus
python -m venv .argus_env
source .argus_env/bin/activate
pip install -r requirements.txt
```

If you already have the backend env, reuse it: just activate the root
`.argus_env` and install the root requirements file once.

### What it exposes

- `search_papers(topic, max_results)` for arXiv discovery.
- `extract_info(paper_id)` and `get_last_papers()` for paper history lookup.
- `predict_retina_image(image_path)` for calling the Argus DR screening backend
	through the GraphQL upload mutation.

### Run it

```bash
cd mcp-server
python research_server.py
```

### Run the MCP client

```bash
cd mcp-server
python argus_agent.py
```

If you want backend + MCP + Expo web together, run the repo-root launcher:

```bash
python dev.py
```

The prediction tool expects the Django GraphQL backend to be running locally at
`http://127.0.0.1:8000/graphql/` unless `ARGUS_GRAPHQL_URL` is set.
