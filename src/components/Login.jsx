import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Logo, Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    try {
      setError("");
      const session = await authService.loginAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        userData ? dispatch(authLogin(userData)) : null;
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full my-6">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error.length > 0 && (
          <p className="text-red-600 mt-8 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8 bg-gray-100">
        <div className="space-y-5">
          <Input
            label="E-Mail:"
            placeholder="Enter Your Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email must be an valid one",
              },
            })}
          />
          <Input label="Password" placeholder="Enter Password" type="password" {...register("password",{
            required:true
          })}/>
          <Button type="submit" >Sign In</Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
