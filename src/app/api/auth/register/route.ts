import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.username || !data.password) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "El correo o nombre de usuario ya está en uso.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return NextResponse.json(
        { message: "No se pudo registrar el usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "¡Usuario registrado correctamente!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error || "Error en el servidor" },
      { status: 500 }
    );
  }
}
