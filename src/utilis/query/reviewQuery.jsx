import Cookies from "js-cookie";
import { server } from "../Server";

export const addReview = async ({ review }) => {
  const res = await fetch(
    `${server}/reviews/review?token=${Cookies.get("token")}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${Cookies.get("token")}`,
      },
      body: JSON.stringify(review),
    }
  );
  const data = await res.json();
  return data;
};
