"use client";

import DeleteIcon from "@/icons/buttons/DeleteIcon";
import EditIcon from "@/icons/buttons/EditIcon";
import { useEffect, useState } from "react";

interface NotesTypes {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

function CardNotes() {
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

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("es-Es", options);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && <div>Cargando notas...</div>}
        {error && <div>Error: {error}</div>}
        {notes.length > 0
          ? notes.map((n: NotesTypes) => (
              <div
                key={n.id}
                className="relative p-3 border rounded cursor-pointer border-card_border bg-card_bg"
              >
                <span className="text-sm text-text_color">
                  {formatDate(n.createdAt.toString())}
                </span>
                <br />
                <h1>{n.title}</h1>
                <p>{n.content}</p>
                <div className="absolute flex items-center gap-2 top-2 right-2">
                  <button className="p-1 rounded bg-button_bg">
                    <EditIcon />
                  </button>
                  <button className="p-1 border rounded border-card_border">
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))
          : !loading && <div>No hay notas</div>}
      </div>
    </>
  );
}

export default CardNotes;
