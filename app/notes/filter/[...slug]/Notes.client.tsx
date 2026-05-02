"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, 6, tag),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div className="p-10 text-center">Завантаження...</div>;

  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        Помилка:{" "}
        {error instanceof Error ? error.message : "Не вдалося завантажити дані"}
      </div>
    );

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <div className="mb-6 flex gap-4 items-center">
        <SearchBox value={search} onChange={handleSearchChange} />
        <button
          onClick={handleModalOpen}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Додати нотатку
        </button>
      </div>

      {notes.length > 0 ? (
        <NoteList notes={notes as Note[]} />
      ) : (
        <div className="p-10 border-2 border-dashed text-center text-gray-400 rounded-lg">
          Нотаток не знайдено.
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            pageCount={totalPages}
            forcePage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <NoteForm onCancel={handleModalClose} />
        </Modal>
      )}
    </div>
  );
}
