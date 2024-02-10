import Cookies from "js-cookie";
import { server } from "../Server";

const setTokenToCookie = (token) => {
  Cookies.set("token", token, { expires: 7 });
};

export const signin = async ({ user }) => {
  const res = await fetch(`${server}/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (data.success) setTokenToCookie(data.token);
  return data;
};

export const login = async ({ user }) => {
  const res = await fetch(`${server}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (data.success) setTokenToCookie(data.token);
  return data;
};
