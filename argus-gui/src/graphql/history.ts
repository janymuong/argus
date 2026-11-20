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
    clinicalAssessment: string;
    followUpRequired: boolean;
    reviewedByUsername: string | null;
    reviewedAt: string | null;
    isReviewed: boolean;
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
      clinicalAssessment
      followUpRequired
      reviewedByUsername
      reviewedAt
      isReviewed
    }
  }
`;

const REVIEW_SCREENING_MUTATION = `
  mutation ReviewScreening(
    $recordId: ID!
    $clinicalAssessment: String!
    $followUpRequired: Boolean!
  ) {
    reviewScreening(
      recordId: $recordId
      clinicalAssessment: $clinicalAssessment
      followUpRequired: $followUpRequired
    ) {
      success
      message
      record {
        id
        clinicalAssessment
        followUpRequired
        reviewedByUsername
        reviewedAt
        isReviewed
      }
    }
  }
`;

type GraphQLResponse<T> = {
    data?: T;
    errors?: { message: string }[];
};

async function graphqlRequest<T>(
    accessToken: string,
    query: string,
    variables?: Record<string, unknown>,
): Promise<T> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query, variables }),
    });

    const json = await response.json() as GraphQLResponse<T>;

    if (!response.ok) {
        throw new Error(`Server returned ${response.status}.`);
    }

    if (json.errors?.length) {
        throw new Error(json.errors[0].message);
    }

    if (!json.data) {
        throw new Error("The server returned an invalid response.");
    }

    return json.data;
}

export async function fetchScreeningHistory(
    accessToken: string,
): Promise<ScreeningHistoryRecord[]> {
    const data = await graphqlRequest<{
        screeningHistory: ScreeningHistoryRecord[];
    }>(accessToken, SCREENING_HISTORY_QUERY);

    return data.screeningHistory ?? [];
}

export async function submitClinicalReview(
    accessToken: string,
    recordId: string,
    clinicalAssessment: string,
    followUpRequired: boolean,
): Promise<{ success: boolean; message: string }> {
    const data = await graphqlRequest<{
        reviewScreening: {
            success: boolean;
            message: string;
        };
    }>(
        accessToken,
        REVIEW_SCREENING_MUTATION,
        {
            recordId,
            clinicalAssessment,
            followUpRequired,
        },
    );

    return data.reviewScreening;
}
