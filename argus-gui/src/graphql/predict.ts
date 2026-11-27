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
const isWeb = typeof window !== "undefined";

export const API_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/graphql/`;

export const PREDICT_MUTATION = `
  mutation Predict($file: Upload!, $patientId: ID!) {
    predict(image: $file, patientId: $patientId) {
      __typename
      ... on PredictionResult {
        screeningRecordId
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
  screeningRecordId: string;
  predictedClass: string;
  confidence: number;
  allProbabilities: { label: string; probability: number }[];
};

export type PredictionError = {
  __typename: "PredictionError";
  message: string;
};

export type PredictResponse = PredictionResult | PredictionError;

export type PatientOption = {
  id: string;
  username: string;
  email: string;
  role: "PATIENT";
};

const PATIENTS_QUERY = `
  query Patients($search: String) {
    patients(search: $search) {
      id
      username
      email
      role
    }
  }
`;

export async function fetchPatients(
  accessToken: string,
  search = "",
): Promise<PatientOption[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: PATIENTS_QUERY,
      variables: { search: search.trim() || null },
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}.`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  return (json.data?.patients ?? []) as PatientOption[];
}

/**
 * Sends a fundus photo to the predict mutation using the GraphQL
 * multipart request spec directly, bypassing any client library's
 * automatic (and on RN, unreliable) file extraction.
 */
export async function runPrediction(
  imageUri: string,
  accessToken: string,
  patientId: string,
): Promise<PredictResponse> {
  const formData = new FormData();

  formData.append(
    "operations",
    JSON.stringify({
      query: PREDICT_MUTATION,
      variables: { file: null, patientId },
    })
  );
  formData.append("map", JSON.stringify({ "0": ["variables.file"] }));

  if (isWeb) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    formData.append("0", blob, "fundus.jpg");
  } else {
    // react native's FormData accepts this {uri, name, type} shape directly.
    formData.append("0", {
      uri: imageUri,
      name: "fundus.jpg",
      type: "image/jpeg",
    } as any);
  }

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Deliberately NOT setting Content-Type — fetch sets the correct
      // multipart boundary automatically when body is a FormData instance.
      // Setting it manually here breaks the boundary.
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      __typename: "PredictionError",
      message: errorText
        ? `Server returned ${response.status}: ${errorText}`
        : `Server returned ${response.status}`,
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
