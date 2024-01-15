const server = import.meta.env.VITE_SERVER;
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
  return data;
};
