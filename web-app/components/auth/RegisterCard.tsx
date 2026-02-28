"use client";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import Divider from "../general/Divider";
import SocialOAuth from "./SocialOAuth";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import Swal from "sweetalert2";
import { useUserStore } from "@/stores/useUserStore";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setRefreshToken = useUserStore((state) => state.setRefreshToken);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await authService.register(
        data.email,
        data.password,
        data.confirmPassword,
        data.firstName,
        data.lastName
      );

      if (!response) return;

      setUser(response.user);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-[var(--card)] rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName", { required: true })}
              className="w-full px-2 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
            />
            {errors.firstName && (
              <label className="text-[var(--error)] w-full">
                {"First name is required"}
              </label>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName", { required: true })}
              className="w-full px-2 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
            />
            {errors.lastName && (
              <label className="text-[var(--error)] w-full">
                {"Last name is required"}
              </label>
            )}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="w-full px-2 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
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
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              className="w-full pl-2 pr-12 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
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
        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              className="w-full pl-2 pr-12 py-2 border border-[var(--border)] rounded-md focus:outline-none focus:ring focus:ring-[var(--primary)]"
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

          {errors.confirmPassword && (
            <label className="text-[var(--error)] w-full">
              {"Confirm password is required"}
            </label>
          )}
        </div>
        <div className="w-full flex items-center  flex-col-reverse md:flex-row gap-4">
          <div className="w-full md:w-2/3 text-right md:text-left">
            <Link href={"/auth/login"}>Log In</Link>
          </div>
          <button
            type="submit"
            className="w-full md:w-1/3 bg-[var(--primary)] text-white py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors"
          >
            Register
          </button>
        </div>
      </form>
      <Divider text="OR" />
      <SocialOAuth />
    </div>
  );
}
