import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { signin } from "../utilis/query/authQuery";

import Auth from "../components/page_component/Auth";

function Signin() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const success = async (d) => {
    if (!d.success) return setErrorMsg(d.message);
    navigate("/");
  };

  const userMutationForSignin = useMutation({
    mutationFn: signin,
    onSuccess: (data) => success(data),
    onError: (e) => setErrorMsg(e.message),
  });
  useEffect(() => {
    document.title = "Signin";
  }, []);
  return (
    <>
      <Auth
        isLoginPage={false}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        userMutationForSignin={userMutationForSignin}
      />
    </>
  );
}

export default Signin;
