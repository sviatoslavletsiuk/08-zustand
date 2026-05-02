import axios from "axios";
import { Note, CreateNoteDto, NotesResponse } from "@/types/note";

const api = axios.create({
  // Твій URL MockAPI
  baseURL: "https://69e60c73ce4e908a155edec4.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
});

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  perPage: number = 6,
  tag: string = "all",
): Promise<NotesResponse> => {
  // MockAPI використовує 'page' та 'limit'.
  // Якщо першої нотатки немає, можливо, MockAPI очікує старт з 1 (ми це вказали).
  const isFiltering = tag !== "all" || Boolean(search);
  const apiLimit = isFiltering ? 1000 : perPage;
  const apiPage = isFiltering ? 1 : page;

  const params: Record<string, string | number | undefined> = {
    page: apiPage,
    limit: apiLimit,
  };

  try {
    const { data } = await api.get<Note[]>("/notes", { params });

    const filteredNotes = data.filter((note) => {
      const matchesTag =
        tag === "all" || note.tag === tag || note.category === tag;
      const lowerSearch = search.toLowerCase();
      const matchesSearch =
        !search ||
        note.title.toLowerCase().includes(lowerSearch) ||
        note.content.toLowerCase().includes(lowerSearch) ||
        note.tag?.toLowerCase().includes(lowerSearch) ||
        note.category.toLowerCase().includes(lowerSearch);
      return matchesTag && matchesSearch;
    });

    const totalCount = filteredNotes.length;
    const totalPages = Math.ceil(totalCount / perPage) || 1;
    const notes = filteredNotes.slice((page - 1) * perPage, page * perPage);

    return {
      notes,
      totalPages: totalPages,
      total: totalCount,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};
