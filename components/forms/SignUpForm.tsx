"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { usePrivadoQuery, usePublicoQuery } from "@/store/rtk/test";
import { useSelector } from "react-redux";
import { getTest } from "../login/ServerSide";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

// Define Zod schema for form validation
const signUpSchema = z.object({
  storeName: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.number().min(2, "Name must be at least 2 characters"),
  terms: z.literal(true, {
    errorMap: () => ({
      message: "Debes aceptar los términos y condiciones",
    }),
  }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { token, isAuthenticated } = useSelector((state: any) => state.auth);
  const { user, error, isLoading } = useUser();
  console.log(user?.sub);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data); // Handle form submission
  };

  const handleMPConnection = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/mp/connect/${user?.sub}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-2">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Registrate como vendedor
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre del negocio
            </Label>
            <Input
              type="text"
              id="storeName"
              className={`w-full border ${
                errors.storeName ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
              {...register("storeName")}
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storeName.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Dirección
            </Label>
            <Input
              type="text"
              id="address"
              className={`w-full border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Teléfono
            </Label>
            <Input
              type="text"
              id="phone"
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="terms"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                {...register("terms")}
              />
              Acepto los
              <Link
                href="/terms"
                className="text-blue-500 hover:underline ml-1"
              >
                Términos y Condiciones
              </Link>
            </Label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          <Button
            className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            onClick={handleMPConnection}
          >
            Conecta tu cuenta de Mercadopago
          </Button>
          <Button
            type="submit"
            className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
