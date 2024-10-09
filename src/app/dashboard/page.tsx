"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NotesTypes {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

function DashboardPage() {
  const [notes, setNotes] = useState<NotesTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notes");
        if (!response.ok) {
          throw new Error("Error al cargar las notas");
        }
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  return (
    <>
      <div>DashboardPage</div>
      <br />
      <Link href="/dashboard/notes">Notas</Link>
      <div>
        {loading && <div>Cargando notas...</div>}
        {error && <div>Error: {error}</div>}
        {notes.length > 0
          ? notes.map((n: NotesTypes) => (
              <div key={n.id}>
                <h1>{n.title}</h1>
                <p>{n.content}</p>
              </div>
            ))
          : !loading && <div>No hay notas</div>}
      </div>
    </>
  );
}

export default DashboardPage;
