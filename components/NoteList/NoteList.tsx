"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.noteGrid}>
      {notes.map((note) => (
        <li key={note.id} className={css.noteCard}>
          <Link href={`/notes/${note.id}`} className={css.noteLink}>
            <h3 className={css.noteTitle}>{note.title}</h3>
            <p className={css.noteContent}>{note.content}</p>
            <span className={css.noteTag}>
              Tag: {note.category || note.tag || "General"}
            </span>
          </Link>
          <button
            className={css.deleteBtn}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(note.id);
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
