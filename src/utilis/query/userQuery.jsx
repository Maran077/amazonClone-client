import Cookies from "js-cookie";
import { server } from "../Server";

export const userProfile = async () => {
  const res = await fetch(
    `${server}/profile/user?token=${Cookies.get("token")}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `token=${Cookies.get("token")}`,
      },
    }
  );
  const data = await res.json();
  return data;
};

export const editUser = async ({ user }) => {
  const form = new FormData();
  const { userName, userProfile, role, description } = user;

  form.append("userName", userName);
  form.append("role", role);
  if (role === "seller") form.append("description", description);
  if (!userProfile.data) form.append("userProfilePic", userProfile);

  const res = await fetch(`${server}/user/edit?token=${Cookies.get("token")}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Cookie: `token=${Cookies.get("token")}`,
    },
    body: form,
  });

  const data = await res.json();
  return data;
};

export const sellerProfile = async (name) => {
  const res = await fetch(`${server}/profile/seller/${name}`);
  const data = await res.json();
  return data;
};

export const updateCartProucts = async (productId) => {
  const res = await fetch(`${server}/user/cart?token=${Cookies.get("token")}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Cookie: `token=${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();
  return data;
};
