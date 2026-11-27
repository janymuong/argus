import { API_URL } from "./predict";
import type { PatientOption } from "./predict";
import type { ScreeningHistoryRecord } from "./history";

export type PatientProfile = Pick<PatientOption, "id" | "username" | "email"> & {
    screeningRecords: ScreeningHistoryRecord[];
};


const PATIENT_DETAIL_QUERY = `
    query PatientDetail($patientId: ID!) {
        patientDetail(patientId: $patientId) {
            id
            username
            email
            screeningRecords {
                id
                patientUsername
                clinicianUsername
                predictedClass
                confidence
                allProbabilities { label probability }
                createdAt
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

export async function fetchPatientProfile(
    accessToken: string,
    patientId: string,
): Promise<PatientProfile | null> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            query: PATIENT_DETAIL_QUERY,
            variables: { patientId },
        }),
    });

    const json = await response.json() as GraphQLResponse<{
        patientDetail: PatientProfile | null;
    }>;

    if (!response.ok) {
        throw new Error(`Server returned ${response.status}.`);
    }
    if (json.errors?.length) {
        throw new Error(json.errors[0].message);
    }
    if (!json.data) {
        throw new Error("The server returned an invalid response.");
    }
    return json.data.patientDetail ?? null;
}
