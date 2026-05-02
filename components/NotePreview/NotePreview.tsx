"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export const NotePreview = ({ id }: NotePreviewProps) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError || !note) return <p>Нотатку не знайдено.</p>;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>Тег: {note.tag}</span>
        <span className={css.category}>Категорія: {note.category}</span>
      </div>
    </div>
  );
};
