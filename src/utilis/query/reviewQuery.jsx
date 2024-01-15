import Cookies from "js-cookie";

export const addReview = async ({ review }) => {
  const server = import.meta.env.VITE_SERVER;
  const res = await fetch(`${server}/reviews/review`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${Cookies.get("token")}`,
    },
    body: JSON.stringify(review),
  });
  const data = await res.json();
  return data;
};
