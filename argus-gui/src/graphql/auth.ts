export const BACKEND_HOST =
  process.env.EXPO_PUBLIC_BACKEND_HOST || "localhost";

export const BACKEND_PORT =
  process.env.EXPO_PUBLIC_BACKEND_PORT || "8000";

export const API_URL =
  `http://${BACKEND_HOST}:${BACKEND_PORT}/graphql/`;

export type UserRole = "PATIENT" | "CLINICIAN" | "ADMIN";

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
};

export type AuthPayload = {
  success: boolean;
  message: string;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const USER_FIELDS = `
  id
  username
  email
  role
`;

export const REGISTER_MUTATION = `
  mutation Register(
    $username: String!
    $password: String!
    $email: String
  ) {
    register(
      username: $username
      password: $password
      email: $email
    ) {
      success
      message
      accessToken
      refreshToken
      user {
        ${USER_FIELDS}
      }
    }
  }
`;

export const LOGIN_MUTATION = `
  mutation Login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      success
      message
      accessToken
      refreshToken
      user {
        ${USER_FIELDS}
      }
    }
  }
`;

export const ME_QUERY = `
  query Me {
    me {
      ${USER_FIELDS}
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout(
    $refreshToken: String!
  ) {
    logout(
      refreshToken: $refreshToken
    ) {
      success
      message
    }
  }
`;

type GraphQLResponse<T> = {
  data?: T;
  errors?: {
    message: string;
  }[];
};

async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  accessToken?: string | null,
): Promise<T> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken
        ? {
          Authorization: `Bearer ${accessToken}`,
        }
        : {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  let json: GraphQLResponse<T>;

  try {
    json = (await response.json()) as GraphQLResponse<T>;
  } catch {
    throw new Error(
      `The server returned an invalid response (${response.status}).`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `Server returned ${response.status}.`,
    );
  }

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("The server returned no data.");
  }

  return json.data;
}

export async function register(
  username: string,
  password: string,
  email: string,
): Promise<AuthPayload> {
  const data = await graphqlRequest<{
    register: AuthPayload;
  }>(
    REGISTER_MUTATION,
    {
      username,
      password,
      email,
    },
  );

  return data.register;
}

export async function login(
  username: string,
  password: string,
): Promise<AuthPayload> {
  const data = await graphqlRequest<{
    login: AuthPayload;
  }>(
    LOGIN_MUTATION,
    {
      username,
      password,
    },
  );

  return data.login;
}

export async function fetchMe(
  accessToken: string,
): Promise<User | null> {
  const data = await graphqlRequest<{
    me: User | null;
  }>(
    ME_QUERY,
    {},
    accessToken,
  );

  return data.me;
}

export async function logout(
  refreshToken: string,
): Promise<void> {
  await graphqlRequest<{
    logout: {
      success: boolean;
      message: string;
    };
  }>(
    LOGOUT_MUTATION,
    {
      refreshToken,
    },
  );
}