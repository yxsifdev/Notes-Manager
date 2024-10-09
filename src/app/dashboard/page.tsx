import HeaderComponent from "@/components/ui/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import yxsifdev_av from "@/images/yxsifdev_av.webp";

function DashboardPage() {
  return (
    <>
      <HeaderComponent />
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <Link
          href="/dashboard/notes"
          className="p-4 border rounded border-card_border bg-card_bg"
        >
          <h1 className="mb-2 text-sm font-medium text-text_color_2">
            Gestiona tus notas de manera sencilla ✨
          </h1>
          <div className="flex items-start gap-5">
            <Image
              src={yxsifdev_av}
              alt="img-icon"
              width={70}
              height={60}
              className="rounded-full"
            />
            <p className="text-sm text-text_color text-pretty">
              <span className="text-text_link">
                Administra todas tus ideas y proyectos desde un solo lugar.
              </span>{" "}
              Lleva el control de tus notas, actualiza y elimina contenido con
              facilidad.
            </p>
          </div>
        </Link>
        <div className="p-4 border rounded border-card_border bg-card_bg">
          <h1 className="mb-2 text-sm font-medium text-text_color_2">
            Desarrollado por YxsifDev 👨‍💻
          </h1>
          <div className="flex items-start gap-5">
            <Image
              src={yxsifdev_av}
              alt="img-icon"
              width={70}
              height={60}
              className="rounded-full"
            />
            <p className="text-sm text-text_color text-pretty">
              <a href="https://github.com/yxsifdev" className="text-text_link">
                YxsifDev
              </a>{" "}
              Desarrollador Frontend. Recuerda darle una estrella al
              repositorios si este te ha gustado o te llegó a ayudar.
            </p>
          </div>
        </div>
        <div className="p-4 border rounded border-card_border bg-card_bg">
          <h1 className="mb-2 text-sm font-medium text-text_color_2">
            Únete a mi servidor de Discord (Quantum)
          </h1>
          <div className="flex items-start gap-5">
            <Image
              src={yxsifdev_av}
              alt="img-icon"
              width={70}
              height={60}
              className="rounded-full"
            />
            <p className="text-sm text-text_color text-pretty">
              <a href="/" className="text-text_link">
                Servidor de programación en español.
              </a>{" "}
              Que esperas para unirte, hazlo ahora y disfruta de el.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardPage;
