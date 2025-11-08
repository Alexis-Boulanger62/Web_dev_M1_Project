import React from "react";
import type { AuthorModel as Author } from "../authormodel";

type Props = {
  author: Author;
  onDelete: (id: string) => void;
};

export const AuthorCard: React.FC<Props> = ({ author, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <a href={`/authors/${author.id}/`} style={{ textDecoration: "none", color: "inherit", flex: 1 }}>
        <div>
          <strong>{author.name}</strong>
          <div style={{ fontSize: 13, color: "#666" }}>{author.booksCount} livre(s)</div>
        </div>
      </a>
      <div>
        <button onClick={() => onDelete(author.id)} style={{ background: "#d9534f", color: "white", border: "none", padding: "6px 10px", borderRadius: 4 }}>
          Supprimer
        </button>
      </div>
    </div>
  );
};