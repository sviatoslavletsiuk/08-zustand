import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

// В Next.js 15 params — це Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} - NoteHub`,
      description: note.content || "View this note details.",
      openGraph: {
        title: `${note.title} - NoteHub`,
        description: note.content || "View this note details.",
        url: `https://your-domain.com/notes/${id}`,
        images: [
          { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
        ],
      },
    };
  } catch {
    return {
      title: "Note Not Found - NoteHub",
      description: "The note you are looking for does not exist.",
    };
  }
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Обов'язково додаємо await тут

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
