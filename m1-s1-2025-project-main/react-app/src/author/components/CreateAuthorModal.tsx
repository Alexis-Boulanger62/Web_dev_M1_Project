import React, { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: { name: string; bio?: string }) => Promise<void>;
};

export const CreateAuthorModal: React.FC<Props> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
      <div style={{ background: "white", padding: 20, borderRadius: 6, width: 420 }}>
        <h3>Créer un auteur</h3>
        <div style={{ display: "grid", gap: 8 }}>
          <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
          <textarea placeholder="Bio (optionnel)" value={bio} onChange={e => setBio(e.target.value)} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button onClick={onClose}>Annuler</button>
            <button onClick={async () => { if (!name.trim()) return; await onCreate({ name: name.trim(), bio: bio.trim() || undefined }); setName(""); setBio(""); onClose(); }} style={{ background: "#2b8a3e", color: "white", border: "none", padding: "6px 10px", borderRadius: 4 }}>
              Créer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};