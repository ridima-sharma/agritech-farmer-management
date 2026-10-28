export function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast-container ${toast.type || "success"}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {toast.type === "error" ? "⚠️" : toast.type === "info" ? "ℹ️" : "✅"}
        </span>
        <span className="toast-message">{toast.message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}
