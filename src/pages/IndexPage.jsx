import { useState, useEffect } from "react";
import { getAtracoes } from "../services/firebase.js";
import { AtracaoCard } from "../components/AtracaoCard.jsx";

const FILTROS = [
  { label: "🗺️ Todos",      value: "todos" },
  { label: "🥾 Trilhas",    value: "Trilha" },
  { label: "💧 Cachoeiras", value: "Cachoeira" },
  { label: "📅 Eventos",    value: "Evento" },
];

export function IndexPage({ onNavigateAdmin }) {
  const [atracoes, setAtracoes] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState(null);
  const [filtro, setFiltro]     = useState("todos");

  useEffect(() => {
    getAtracoes()
      .then((data) => { setAtracoes(data); setLoading(false); })
      .catch((err) => { setErro(err.message); setLoading(false); });
  }, []);

  const exibidas = filtro === "todos"
    ? atracoes
    : atracoes.filter((a) => a.tipo === filtro);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-badge">🌿 Teresópolis · RJ</div>
          <h1 className="site-title">Terê Verde</h1>
          <p className="site-subtitle">Trilhas, cachoeiras e eventos da natureza</p>
          <button className="btn-outline-light" onClick={onNavigateAdmin}>
            Área Admin
          </button>
        </div>
      </header>

      <nav className="filter-bar">
        <div className="filter-group">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              className={`btn-filter${filtro === f.value ? " active" : ""}`}
              onClick={() => setFiltro(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="section-atracoes">
        <h2 className="section-heading">Atrações</h2>

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Buscando atrações...</p>
          </div>
        )}

        {erro && (
          <div className="alert-danger">
            <strong>Erro ao conectar com o banco de dados.</strong><br />
            <small>{erro}</small>
          </div>
        )}

        {!loading && !erro && (
          <div className="atracoes-grid">
            {exibidas.length === 0 ? (
              <p className="text-muted text-center" style={{ gridColumn: "1/-1", padding: "3rem 0" }}>
                Nenhuma atração encontrada. 🌿
              </p>
            ) : (
              exibidas.map((a) => <AtracaoCard key={a.id} atracao={a} />)
            )}
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>© 2025 <strong>Terê Verde</strong> — Circuito Ecoturístico de Teresópolis</p>
        <p>Desenvolvido com ❤️ por Jeann Rezende</p>
      </footer>
    </>
  );
}
