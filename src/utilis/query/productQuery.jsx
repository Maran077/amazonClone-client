import Cookies from "js-cookie";
const server = import.meta.env.VITE_SERVER;
export const createProduct = async ({ product }) => {
  const form = new FormData();
  const { productName, productImages, category, description, price, stocks } =
    product;

  form.append("productName", productName);
  form.append("category", category);
  form.append("price", price);
  form.append("stocks", stocks);
  form.append("description", description);

  for (const file of productImages) {
    form.append("productImages", file);
  }

  const res = await fetch(`${server}/products/product`, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: `token=${Cookies.get("token")}`,
    },
    body: form,
  });

  const data = await res.json();
  return data;
};

export const getHomeProducts = async (filters) => {
  const queryString = Object.keys(filters)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
    )
    .join("&");

  const res = await fetch(`${server}/products/product?${queryString}`);
  console.log(`${server}/products/product?${queryString}`);
  const data = await res.json();
  return data;
};

export const getSingleProduct = async ({ id }) => {
  const res = await fetch(`${server}/products/product/${id}`);
  const data = await res.json();
  return data;
};
