import { useState } from "react";
import { IndexPage } from "./pages/IndexPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { ToastProvider } from "./components/Toast.jsx";

export default function App() {
  const [page, setPage] = useState(
    window.location.hash === "#admin" ? "admin" : "index"
  );

  const navigate = (p) => {
    window.location.hash = p === "admin" ? "#admin" : "";
    setPage(p);
  };

  return (
    <ToastProvider>
      {page === "index"
        ? <IndexPage onNavigateAdmin={() => navigate("admin")} />
        : <AdminPage onNavigateHome={() => navigate("index")} />
      }
    </ToastProvider>
  );
}
