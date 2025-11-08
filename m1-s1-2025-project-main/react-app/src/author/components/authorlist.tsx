import React from "react";
import type { AuthorModel as Author } from "../authormodel";
import { AuthorCard } from "./authorcard";

type Props = {
  authors: Author[];
  onDelete: (id: string) => void;
};

export const AuthorList: React.FC<Props> = ({ authors, onDelete }) => {
  if (authors.length === 0) return <div>Aucun auteur.</div>;
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {authors.map(a => (
        <AuthorCard key={a.id} author={a} onDelete={onDelete} />
      ))}
    </div>
  );
};