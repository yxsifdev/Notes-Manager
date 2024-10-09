import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "No estás autenticado." },
        { status: 401 }
      );
    }
    const userEmail = session.user?.email;
    if (!userEmail) return;

    const findUser = await db.user.findUnique({
      where: { email: userEmail },
    });

    if (!findUser) throw new Error("Usuario no encontrado.");

    const notes = await db.notes.findMany({
      where: {
        userId: findUser.id,
      },
    });

    if (!notes) throw new Error("No hay notas para este usuario.");

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
