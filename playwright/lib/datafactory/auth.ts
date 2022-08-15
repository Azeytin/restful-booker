import { expect, request } from "@playwright/test";
require("dotenv").config();

let baseURL = process.env.AUTH_URL || process.env.URL;

async function getAuthToken(username: string, password: string) {
  let data = {
    username: username,
    password: password,
  };
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(baseURL + "/auth/login", {
    data: data,
  });

  expect(response.status()).toBe(200);
  const headers = await response.headers();
  let tokenString = headers["set-cookie"].split(";")[0];
  let token = tokenString.split("=")[1];
  return token;
}

export { getAuthToken };
