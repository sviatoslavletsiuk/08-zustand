"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "@/app/notes/[id]/NoteDetails.module.css";
import { Note } from "@/types/note";

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <div className="p-6 text-center">
          <p>Завантаження...</p>
        </div>
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal onClose={handleClose}>
        <div className="p-6 text-center">
          <p>Нотатку не знайдено.</p>
        </div>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <article className={css.container}>
        <header>
          <span className={css.tag}>{note.tag}</span>
          <h1>{note.title}</h1>
        </header>
        <div className={css.content}>
          <p>{note.content}</p>
        </div>
        <footer className={css.meta}>
          <small>Створено: {new Date(note.createdAt).toLocaleString()}</small>
        </footer>
      </article>
    </Modal>
  );
}
