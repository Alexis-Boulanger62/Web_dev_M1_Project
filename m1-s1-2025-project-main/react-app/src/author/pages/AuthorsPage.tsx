import React, { useState } from "react";
import { AuthorProvider, useAuthors } from "../providers/authorprovider";
import { AuthorList } from "../components/authorlist";
import { CreateAuthorModal } from "../components/CreateAuthorModal";
import { ConfirmModal } from "../components/ConfirmModal";

const Inner: React.FC = () => {
  const { authors, loading, createAuthor, deleteAuthor } = useAuthors();
  const [createOpen, setCreateOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await deleteAuthor(toDelete);
    setToDelete(null);
    setConfirmOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Auteurs</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setCreateOpen(true)} style={{ padding: "6px 10px" }}>Créer un auteur</button>
      </div>

      {loading ? <div>Chargement...</div> : <AuthorList authors={authors} onDelete={handleDelete} />}

      <CreateAuthorModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={async (payload) => { await createAuthor(payload); }}
      />
      <ConfirmModal open={confirmOpen} title="Supprimer l'auteur ?" message="Êtes-vous sûr·e de vouloir supprimer cet auteur ?" onCancel={() => setConfirmOpen(false)} onConfirm={confirmDelete} />
    </div>
  );
};

export const AuthorsPage: React.FC = () => {
  return (
    <AuthorProvider>
      <Inner />
    </AuthorProvider>
  );
};