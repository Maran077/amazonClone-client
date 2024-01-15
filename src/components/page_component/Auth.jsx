import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeMenu } from "../../utilis/redux/menuSlice";

import Logo from "../Logo";
import Input from "../input/Input";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";

function Auth({
  isLoginPage,
  userMutationForLogin,
  userMutationForSignin,
  errorMsg,
  setErrorMsg,
}) {
  const title = isLoginPage ? "Log in" : "Create Account";

  const formRef = useRef();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(changeMenu({ isOpen: false }));
  }, []);

  const submit = () => {
    event.preventDefault();
    setErrorMsg("");
    const user = {};
    const form = formRef.current;

    if (!isLoginPage) user.email = form.elements.email.value;
    user.userName = form.elements.userName.value;
    user.password = form.elements.password.value;

    if (isLoginPage) return userMutationForLogin.mutate({ user });
    userMutationForSignin.mutate({ user: user });
    console.log(user);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 ">
      <Link to={"/"}>
        <Logo black={true} />
      </Link>
      <form
        action=""
        ref={formRef}
        onSubmit={submit}
        className="border-2 rounded pt-3 px-6 pb-6 w-[90%] max-w-[450px] min-w-[300px] flex flex-col gap-3 justify-center"
      >
        <h1 className="text-[2rem] md:text-[2.6rem] font-bold">{title}</h1>

        <Input
          label={"UserName"}
          id="userName"
          name="userName"
          type="text"
          placeholder="First and last name"
        />

        {!isLoginPage && (
          <Input
            label={"Email"}
            id="email"
            name="email"
            text="email"
            placeholder="Enter email"
          />
        )}

        <Input
          label={"Password"}
          id="password"
          name="password"
          type="password"
          placeholder="Atleast 8 character"
        />
        <p className="text-center font-bold text-red-600">{errorMsg}</p>
        <Button
          hover={"yellow"}
          text={"black"}
          disabled={
            userMutationForLogin?.isPending || userMutationForSignin?.isPending
          }
        >
          {userMutationForLogin?.isPending ||
          userMutationForSignin?.isPending ? (
            <LoadingSpinner extraStyle={"w-[30px] h-[30px]"} />
          ) : (
            title
          )}
        </Button>
        <hr />
        <p className="flex gap-1">
          {isLoginPage ? "You don't" : "Already"} have an account?
          <Link
            className="text-blue-500 hover:text-red-600 hover:underline"
            to={`/auth/${isLoginPage ? "signin" : "login"}`}
          >
            {isLoginPage ? "signin" : "Log in"}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Auth;
