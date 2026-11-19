import { API_URL } from "./predict";

export type ScreeningHistoryRecord = {
    id: string;
    patientUsername: string;
    clinicianUsername: string;
    predictedClass: string;
    confidence: number;
    allProbabilities: {
        label: string;
        probability: number;
    }[];
    createdAt: string;
};

const SCREENING_HISTORY_QUERY = `
  query ScreeningHistory {
    screeningHistory {
      id
      patientUsername
      clinicianUsername
      predictedClass
      confidence
      allProbabilities {
        label
        probability
      }
      createdAt
    }
  }
`;

export async function fetchScreeningHistory(
    accessToken: string,
): Promise<ScreeningHistoryRecord[]> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            query: SCREENING_HISTORY_QUERY,
        }),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(`Server returned ${response.status}.`);
    }

    if (json.errors?.length) {
        throw new Error(json.errors[0].message);
    }

    return (json.data?.screeningHistory ?? []) as ScreeningHistoryRecord[];
}
