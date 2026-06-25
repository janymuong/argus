/**
 * Manual GraphQL multipart upload(operations + map + file parts). We don't rely on
 * urql/Apollo's automatic file-extraction here because React Native's
 * {uri, name, type} picker objects aren't real Blob/File instances, so
 * those libraries silently fail to recognize them as uploads and send
 * them as plain JSON instead — which is seen at the backend as a
 * "'dict' object has no attribute 'read'" error.
 *
 */

const BACKEND_HOST = process.env.EXPO_PUBLIC_BACKEND_HOST || "localhost";
const BACKEND_PORT = process.env.EXPO_PUBLIC_BACKEND_PORT || "8000";

export const API_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/graphql/`;

export const PREDICT_MUTATION = `
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
`;

export type PredictionResult = {
  __typename: "PredictionResult";
  predictedClass: string;
  confidence: number;
  allProbabilities: { label: string; probability: number }[];
};

export type PredictionError = {
  __typename: "PredictionError";
  message: string;
};

export type PredictResponse = PredictionResult | PredictionError;

/**
 * Sends a fundus photo to the predict mutation using the GraphQL
 * multipart request spec directly, bypassing any client library's
 * automatic (and on RN, unreliable) file extraction.
 */
export async function runPrediction(imageUri: string): Promise<PredictResponse> {
  const formData = new FormData();

  formData.append(
    "operations",
    JSON.stringify({
      query: PREDICT_MUTATION,
      variables: { file: null },
    })
  );
  formData.append("map", JSON.stringify({ "0": ["variables.file"] }));

  // React Native's FormData accepts this {uri, name, type} shape directly —
  // no Blob conversion needed on RN.
  formData.append("0", {
    uri: imageUri,
    name: "fundus.jpg",
    type: "image/jpeg",
  } as any);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      // Deliberately NOT setting Content-Type — fetch sets the correct
      // multipart boundary automatically when body is a FormData instance.
      // Setting it manually here breaks the boundary.
    },
  });

  if (!response.ok) {
    return {
      __typename: "PredictionError",
      message: `Server returned ${response.status}`,
    };
  }

  const json = await response.json();

  if (json.errors && json.errors.length > 0) {
    return {
      __typename: "PredictionError",
      message: json.errors[0].message,
    };
  }

  return json.data.predict as PredictResponse;
}
