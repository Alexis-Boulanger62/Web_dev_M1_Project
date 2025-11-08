import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthorModel as Author, CreateAuthorModel, UpdateAuthorModel } from "../authormodel";

type Book = { id: string; title: string; authorId?: string; salesCount?: number | null };
type AuthorContextValue = {
  authors: Author[];
  loading: boolean;
  fetchAuthors: () => Promise<void>;
  createAuthor: (payload: CreateAuthorModel) => Promise<Author>;
  deleteAuthor: (id: string) => Promise<void>;
  updateAuthor: (id: string, payload: UpdateAuthorModel) => Promise<Author | undefined>;
  getAuthor: (id: string) => Author | undefined;
  fetchBooksByAuthor: (authorId: string) => Promise<Book[]>;
};

const AuthorContext = createContext<AuthorContextValue | undefined>(undefined);
const STORAGE_KEY = "authors_demo_v1";

function seedIfEmpty() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed: Author[] = [
      { id: "1", name: "Victor Hugo", bio: "Écrivain français", booksCount: 40 },
      { id: "2", name: "Simone de Beauvoir", bio: "Philosophe", booksCount: 12 },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
}

export const AuthorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const persistLocal = (next: Author[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAuthors(next);
  };
  const loadLocal = () => {
    seedIfEmpty();
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    setAuthors(JSON.parse(raw));
  };
  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/authors");
      if (!res.ok) throw new Error("API error");
      const data: Author[] = await res.json();
      setAuthors(data);
    } catch {
      loadLocal();
    } finally {
      setLoading(false);
    }
  };
  const createAuthor = async (payload: CreateAuthorModel) => {
    try {
      const res = await fetch("/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("API error");
      const created: Author = await res.json();
      setAuthors((prev) => [created, ...prev]);
      return created;
    } catch {
      const newAuthor: Author = {
        id: uuidv4(),
        name: payload.name,
        bio: payload.bio,
        booksCount: 0,
      };
      const next = [newAuthor, ...authors];
      persistLocal(next);
      return newAuthor;
    }
  };
  const deleteAuthor = async (id: string) => {
    try {
      const res = await fetch(`/authors/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("API error");
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch {
      const next = authors.filter((a) => a.id !== id);
      persistLocal(next);
    }
  };
  const updateAuthor = async (id: string, payload: UpdateAuthorModel) => {
    try {
      const res = await fetch(`/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("API error");
      const updated: Author = await res.json();
      setAuthors((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch {
      const next = authors.map((a) => (a.id === id ? { ...a, ...payload } : a));
      persistLocal(next);
      return next.find((a) => a.id === id);
    }
  };
  const getAuthor = (id: string) => authors.find((a) => a.id === id);
  const fetchBooksByAuthor = async (authorId: string) => {
    try {
      // try query param
      const res = await fetch(`/books?authorId=${encodeURIComponent(authorId)}`);
      if (res.ok) {
        const books: Book[] = await res.json();
        return books.filter((b) => !b.authorId || b.authorId === authorId ? true : true);
      }
      // fallback to all books then filter
      const all = await fetch("/books");
      if (!all.ok) throw new Error("no books");
      const data: Book[] = await all.json();
      return data.filter((b) => String(b.authorId) === String(authorId));
    } catch {
      return [];
    }
  };

  useEffect(() => {
    fetchAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthorContext.Provider value={{
      authors,
      loading,
      fetchAuthors,
      createAuthor,
      deleteAuthor,
      updateAuthor,
      getAuthor,
      fetchBooksByAuthor,
    }}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthors = () => {
  const ctx = useContext(AuthorContext);
  if (!ctx) throw new Error("useAuthors must be used inside AuthorProvider");
  return ctx;
};

function uuidv4(): string {
    throw new Error("Function not implemented.");
}
