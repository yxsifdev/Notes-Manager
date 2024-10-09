"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type InputsLogin = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setMessage(null);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        setMessage(res.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setMessage("Error de conexión o servidor. Inténtalo de nuevo.");
    }
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <form onSubmit={onSubmit} className="flex flex-col xl:w-1/4">
        <h1 className="mb-5 text-3xl font-bold text-center">
          Notes Manager ✨
        </h1>
        {message && (
          <div className="p-3 mb-5 bg-red-500 rounded">⚠️ {message}</div>
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
          className="p-2 mb-2 bg-transparent border rounded-lg border-card_border placeholder:text-text_color"
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
    </div>
  );
}

export default LoginPage;
