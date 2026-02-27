"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import Divider from "../general/Divider";
import SocialOAuth from "./SocialOAuth";

type Inputs = {
  email: string;
  password: string;
};

export default function LogInCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="w-full max-w-md p-6 bg-[var(--card)] rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
            placeholder="Enter your email"
          />
          {errors.email && (
            <label className="text-[var(--error)] w-full">
              {"Email is required"}
            </label>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              className="w-full pl-2 pr-12 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEye className="text-gray-500" />
              ) : (
                <FaEyeSlash className="text-gray-500" />
              )}
            </button>
          </div>

          {errors.password && (
            <label className="text-[var(--error)] w-full">
              {"Password is required"}
            </label>
          )}
        </div>
        <div className="w-full flex items-center  flex-col-reverse md:flex-row gap-4">
          <div className="w-full md:w-2/3 text-right md:text-left">
            <Link href={"/auth/register"}>Register</Link>
          </div>
          <button
            type="submit"
            className="w-full md:w-1/3 bg-[var(--primary)] text-white py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors"
          >
            Log In
          </button>
        </div>
      </form>
      <Divider text="OR" />
      <SocialOAuth />
    </div>
  );
}
