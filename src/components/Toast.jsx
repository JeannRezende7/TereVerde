import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const colorMap = {
    success: "#3d7a52",
    danger:  "#dc3545",
    info:    "#0dcaf0",
    warning: "#ffc107",
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div style={{
        position: "fixed", bottom: "1rem", right: "1rem",
        zIndex: 9999, display: "flex", flexDirection: "column", gap: ".5rem",
      }}>
        {toasts.map((t) => (
          <div key={t.id} style={{
            background: colorMap[t.type] || colorMap.success,
            color: "#fff",
            padding: ".75rem 1.25rem",
            borderRadius: ".75rem",
            fontWeight: 600,
            fontSize: ".88rem",
            boxShadow: "0 4px 16px rgba(0,0,0,.18)",
            animation: "slideIn .2s ease",
          }}>
            {t.message}
          </div>
        ))}
      </div>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
