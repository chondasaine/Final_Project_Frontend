import { checkResponse } from "./checkResponse";
import { baseUrl } from "../utils/constants";

export const registerUser = ({ userName, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, email, password }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Registration failed:", err.message);
      throw err;
    });
};

export const loginUser = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Login failed:", err.message);
      throw err;
    });
};
