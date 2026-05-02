import { createNote } from "./api";
import { redirect } from "next/navigation";
import { NoteTag } from "@/types/note";

export async function createNoteAction(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tag = formData.get("tag") as NoteTag;

  if (!title || !tag) {
    throw new Error("Title and tag are required");
  }

  await createNote({ title, content, tag });

  redirect("/notes/filter/all");
}
