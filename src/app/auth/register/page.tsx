"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type InputsRegister = {
  username: string;
  email: string;
  password: string;
};

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsRegister>();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resJSON = await res.json();

      if (res.ok) {
        setMessage(resJSON.message);
      } else {
        setError(resJSON.message);
      }
    } catch (error) {
      console.log(error);
      setError("Error de conexión o servidor. Inténtalo de nuevo.");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <form onSubmit={onSubmit} className="flex flex-col xl:w-1/4">
        <h1 className="mb-5 text-3xl font-bold text-center">Registrarse ✨</h1>
        {error && <div className="p-3 mb-5 bg-red-500 rounded">⚠️ {error}</div>}
        <input
          type="text"
          className="p-2 mb-3 bg-transparent border rounded-lg border-card_border placeholder:text-text_color"
          placeholder="Nombre de Usuario"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="px-2 mb-3 text-xs text-red-500">
            El nombre de usuario es obligatorio
          </span>
        )}
        <input
          type="email"
          className="p-2 mb-3 bg-transparent border rounded-lg border-card_border placeholder:text-text_color"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="px-2 mb-3 text-xs text-red-500">
            El email es obligatorio y debe ser válido
          </span>
        )}
        <input
          type="password"
          className="p-2 mb-3 bg-transparent border rounded-lg border-card_border placeholder:text-text_color"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="px-2 mb-3 text-xs text-red-500">
            La contraseña es obligatoria y debe tener al menos 8 caracteres
          </span>
        )}
        <button className="p-2 mt-5 transition rounded bg-button_bg hover:bg-button_bg/90">
          Continuar
        </button>
        <Link href="/" className="mt-3 text-sm text-center text-text_link">
          Volver al inicio
        </Link>
      </form>
      {message && <div className="text-green-500">{message}</div>}
    </div>
  );
}

export default RegisterPage;
