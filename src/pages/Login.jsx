import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../utilis/query/authQuery";

import Auth from "../components/page_component/Auth";
import { useMutation } from "@tanstack/react-query";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const success = async (d) => {
    if (!d.success) return setErrorMsg(d.message);
    console.log(d, "login");
    navigate("/");
  };

  const userMutationForLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => success(data),
    onError: (e) => setErrorMsg(e.message),
  });
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <>
      <Auth
        isLoginPage={true}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        userMutationForLogin={userMutationForLogin}
      />
      <p>
        <span className="text-orange-600 font-[600] text-xl">UserName:</span>{" "}
        TechHaven Emporium or ElegantLiving Furnishings
      </p>
      <p>
        <span className="text-orange-600 font-[600] text-xl">Password:</span>{" "}
        pa$$w01d
      </p>
    </>
  );
}

export default Login;
