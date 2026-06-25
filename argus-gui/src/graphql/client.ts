// not used anymore, owing to some deprecation issues with urql,
// 
import { createClient, fetchExchange, cacheExchange } from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import Constants from "expo-constants";

const API_URL =
  (Constants.expoConfig?.extra?.apiUrl as string) ||
  "http://localhost:8000/graphql/";

export const urqlClient = createClient({
  url: API_URL,
  exchanges: [cacheExchange, multipartFetchExchange],
});
