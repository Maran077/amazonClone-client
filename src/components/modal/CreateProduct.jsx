import React, { useState } from "react";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../utilis/query/productQuery";

import { changeModal } from "../../utilis/redux/modalSlice";
import { useDispatch } from "react-redux";

import Button from "../Button";
import ImageCarousel from "../ImageCarousel ";
import LoadingSpinner from "../LoadingSpinner";

import Input from "../input/Input";
import SelectionInput from "../input/SelectionInput";
import FileInput from "../input/FileInput";
import TextArea from "../input/TextArea";

function CreateProduct() {
  const categories = [
    "Electronics",
    "Fashion and Apparel",
    "Home and Furniture",
    "Toys and Games",
    "Sports",
  ];

  const [productValue, setProductValue] = useState({});
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (res) => {
      if (!res?.success) return toast.error(res.message);

      dispatch(changeModal({ isOpen: false }));
      toast.success(res?.msg);
    },
    onError: (e) => toast.error(e.message),
  });

  const submit = (event) => {
    event.preventDefault();
    mutate({ product: productValue });
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-2"> Create Product</h1>
      {productValue.productImages && (
        <ImageCarousel
          images={Array.from(productValue.productImages)}
          file={true}
          divStyle={"relative h-[120px] w-full self-center md:self-start "}
        />
      )}
      <form onSubmit={submit} className="flex flex-col gap-1">
        <Input
          label={"Product Name"}
          type="text"
          name="productName"
          id="productName"
          placeholder="product name"
          minLength={10}
          maxLength={100}
          onChange={(e) =>
            setProductValue({ ...productValue, productName: e.target.value })
          }
        />
        <SelectionInput
          title={"Category"}
          values={categories}
          value={productValue?.category}
          onChange={(e) =>
            setProductValue({ ...productValue, category: e.target.value })
          }
        />
        <div className="flex items-center gap-3 my-1">
          <Input
            label={"Price"}
            type="number"
            name="price"
            id="price"
            min={1}
            extraStyle={"w-20 h-8"}
            onChange={(e) =>
              setProductValue({ ...productValue, price: e.target.value })
            }
          />
          <Input
            label={"Stocks"}
            type="number"
            name="stocks"
            id="stocks"
            min={1}
            extraStyle={"w-20 h-8"}
            onChange={(e) =>
              setProductValue({ ...productValue, stocks: e.target.value })
            }
          />
        </div>
        <TextArea
          label={"Product description"}
          type="text"
          name="description"
          id="description"
          placeholder="product description"
          extraStyle={"h-40"}
          minLength={50}
          maxLength={5000}
          onChange={(e) =>
            setProductValue({ ...productValue, description: e.target.value })
          }
        />
        <div className="flex items-center justify-between">
          <FileInput
            label={"Product Image"}
            multiple={true}
            onChange={(e) =>
              setProductValue({
                ...productValue,
                productImages: e.target.files,
              })
            }
          />
          <Button hover={"orange"}>
            {isPending ? <LoadingSpinner extraStyle={"size-5"} /> : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default CreateProduct;
