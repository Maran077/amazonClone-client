import React, { useRef, useState } from "react";
import { Buffer } from "buffer";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../utilis/query/userQuery";

import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../utilis/redux/userSlice";
import { changeModal } from "../../utilis/redux/modalSlice";

import Input from "../input/Input";
import SelectionInput from "../input/SelectionInput";
import TextArea from "../input/TextArea";
import FileInput from "../input/FileInput";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";

function EditProfile() {
  const roles = ["customer", "seller"];
  const formRef = useRef();
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.user);
  const { userName, userProfile, description, role } = userDetail;

  const [userNewValue, setUserNewValue] = useState({
    userName,
    userProfile,
    description,
    role,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editUser,
    onSuccess: (res) => {
      if (!res?.success) return toast.error(res.message);
      const { user, msg, cartProducts, sellingProucts } = res;
      dispatch(setUserProfile({ ...user, cartProducts, sellingProucts }));
      dispatch(changeModal({ isOpen: false }));
      toast.success(msg);
    },
    onError: (e) => toast.error(e.message),
  });

  const submit = (event) => {
    event.preventDefault();
    mutate({ user: userNewValue });
  };
  return (
    <form ref={formRef} onSubmit={submit} className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold mb-2"> Edit Profile</h1>
      <Input
        label={"User Name"}
        type="text"
        name="userName"
        id="userName"
        placeholder="full name"
        value={userNewValue.userName}
        onChange={(e) =>
          // console.log(e.target.value)
          setUserNewValue({ ...userNewValue, userName: e.target.value })
        }
      />
      <SelectionInput
        name="role"
        title={"Role"}
        values={roles}
        value={userNewValue.role}
        onChange={(e) =>
          setUserNewValue({ ...userNewValue, role: e.target.value })
        }
      />
      <TextArea
        label={"description"}
        type="text"
        name="description"
        id="description"
        placeholder="description"
        minLength={20}
        maxLength={1000}
        extraStyle={userNewValue.role !== "seller" && "cursor-not-allowed"}
        disabled={userNewValue.role !== "seller"}
        value={userNewValue.description}
        onChange={(e) =>
          setUserNewValue({ ...userNewValue, description: e.target.value })
        }
      />
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <img
            className="size-8 rounded-full"
            src={
              userNewValue.userProfile.data
                ? `data:image/jpg;base64,${Buffer.from(
                    userNewValue?.userProfile?.data
                  ).toString("base64")}`
                : URL.createObjectURL(userNewValue.userProfile)
            }
            alt="profile"
          />
          <FileInput
            name="file"
            label={"Profile Pic"}
            onChange={(e) =>
              setUserNewValue({
                ...userNewValue,
                userProfile: e.target.files[0],
              })
            }
          />
        </div>
        <div></div>
        <Button type="submit" hover={"orange"}>
          {isPending ? <LoadingSpinner extraStyle={"size-5"} /> : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default EditProfile;
