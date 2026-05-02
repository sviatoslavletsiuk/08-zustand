import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "all";
  const filterName = tag === "all" ? "All Notes" : `Category: ${tag}`;

  return {
    title: `${filterName} - NoteHub`,
    description: `Browse and manage your notes in the ${filterName.toLowerCase()} category.`,
    openGraph: {
      title: `${filterName} - NoteHub`,
      description: `Browse and manage your notes in the ${filterName.toLowerCase()} category.`,
      url: `https://your-domain.com/notes/filter/${tag}`,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, 6, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-6 capitalize">Категорія: {tag}</h1>
        <NotesClient tag={tag} />
      </div>
    </HydrationBoundary>
  );
}
