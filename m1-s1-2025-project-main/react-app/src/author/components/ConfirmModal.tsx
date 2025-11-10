import React from "react";

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmModal: React.FC<Props> = ({ open, title = "Confirmer", message, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
      <div style={{ background: "white", padding: 20, borderRadius: 6, width: 420 }}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onCancel}>Annuler</button>
          <button onClick={onConfirm} style={{ background: "#d9534f", color: "white", border: "none", padding: "6px 10px", borderRadius: 4 }}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};