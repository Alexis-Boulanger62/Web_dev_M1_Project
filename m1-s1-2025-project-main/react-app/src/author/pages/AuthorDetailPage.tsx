import React, { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
// import the route exported from src/routes/authors/$authorId.tsx
import { Route as authorDetailRoute } from "../../routes/authors/$authorId";
import { AuthorProvider, useAuthors } from "../providers/authorprovider";
import type { AuthorModel as Author } from "../authormodel";

const InnerDetail: React.FC = () => {
  // useParams({ from }) -> cast route to any then cast return shape
  const { params } = useParams({ from: (authorDetailRoute as any) }) as unknown as { params?: { authorId?: string } };
  const authorId = params?.authorId;
  const { getAuthor, fetchAuthors, updateAuthor, fetchBooksByAuthor } = useAuthors();
  const [author, setAuthor] = useState<Author | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [avgSales, setAvgSales] = useState<number | null>(null);

  useEffect(() => {
    if (!authorId) return;
    const load = async () => {
      await fetchAuthors(); // ensure authors are loaded
      const a = getAuthor(authorId);
      setAuthor(a);
      if (a) {
        setName(a.name);
        setBio(a.bio || "");
      }
      const bs = await fetchBooksByAuthor(authorId);
      setBooks(bs);
      if (bs.length === 0) {
        setAvgSales(null);
      } else {
        const vals = bs.map(b => Number(b.salesCount ?? 0));
        const avg = vals.reduce((s, v) => s + v, 0) / (vals.length || 1);
        setAvgSales(Number.isFinite(avg) ? avg : null);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorId]);

  if (!authorId) return <div>ID manquant</div>;
  if (!author) return <div>Auteur non trouvé</div>;

  const save = async () => {
    await updateAuthor(author.id, { name, bio });
    setEditMode(false);
    const refreshed = getAuthor(author.id);
    setAuthor(refreshed);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => window.history.back()}>Retour</button>
      {!editMode ? (
        <>
          <h2>{author.name}</h2>
          <p>{author.bio}</p>
          <button onClick={() => setEditMode(true)}>Éditer</button>
        </>
      ) : (
        <div style={{ display: "grid", gap: 8, maxWidth: 600 }}>
          <input value={name} onChange={e => setName(e.target.value)} />
          <textarea value={bio} onChange={e => setBio(e.target.value)} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setEditMode(false)}>Annuler</button>
            <button onClick={save} style={{ background: "#2b8a3e", color: "white" }}>Sauvegarder</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <strong>Nombre de livres :</strong> {author.booksCount}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Livres</h3>
        {books.length === 0 ? <div>Aucun livre trouvé pour cet auteur.</div> : (
          <ul>
            {books.map(b => (
              <li key={b.id}><a href={`/books/${b.id}/`}>{b.title || "Titre inconnu"}</a> — ventes: {b.salesCount ?? b.sales ?? 0}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Ventes moyennes des livres :</strong> {avgSales === null ? "N/A" : avgSales.toFixed(2)}
      </div>
    </div>
  );
};

export const AuthorDetailPage: React.FC = () => (
  <AuthorProvider>
    <InnerDetail />
  </AuthorProvider>
);