import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata = {
  title: "Create New Note - NoteHub",
  description: "Create a new note in your personal note management app.",
  openGraph: {
    title: "Create New Note - NoteHub",
    description: "Create a new note in your personal note management app.",
    url: "https://your-domain.com/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
