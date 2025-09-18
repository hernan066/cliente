"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";

const SignInForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Sign In
        </h2>

        {/* Login con Google */}
        <Button
          className="w-full p-6 flex items-center justify-center gap-2 text-lg mt-6"
          onClick={() =>
            (window.location.href = "/auth/login?connection=google-oauth2")
          }
        >
          <FaGoogle size={25} /> Sign In With Google
        </Button>

        <p className="text-lg font-bold my-2 text-center">OR</p>

        {/* Login normal (Auth0 Universal Login) */}
        <Button
          className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          onClick={() => (window.location.href = "/auth/login")}
        >
          Sign In with Email
        </Button>
        <a href="/auth/login">Login</a>

        <p className="text-center m-1">
          Don&apos;t have an account{" "}
          <Link className="underline" href="/auth/login?screen_hint=signup">
            Sign Up
          </Link>
        </p>

        <div className="font-medium">
          Forgot Password
          <Link
            className="underline p-2"
            href="https://TU-DOMINIO.auth0.com/u/reset-password"
          >
            here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
// Nota: Reemplaza "TU-DOMINIO" en el enlace de restablecimiento de contraseña con tu dominio Auth0 real.
