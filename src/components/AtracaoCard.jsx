import { useState } from "react";

const TIPO_CONFIG = {
  Trilha:    { badge: "#3d7a52", icon: "🥾" },
  Cachoeira: { badge: "#0dcaf0", icon: "💧", dark: true },
  Evento:    { badge: "#ffc107", icon: "📅", dark: true },
};

export function AtracaoCard({ atracao }) {
  const [idx, setIdx] = useState(0);
  const cfg     = TIPO_CONFIG[atracao.tipo] || { badge: "#6c757d", icon: "📍" };
  const imagens = (atracao.imagens || []).filter(Boolean);
  const imgUrl  = imagens.length
    ? imagens[idx]
    : "https://placehold.co/600x340/3d6b44/white?text=Sem+Imagem";

  const prev = () => setIdx((i) => (i - 1 + imagens.length) % imagens.length);
  const next = () => setIdx((i) => (i + 1) % imagens.length);

  return (
    <div className="atracao-card">
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={imgUrl}
          alt={atracao.nome}
          className="card-img"
          onError={(e) => { e.target.src = "https://placehold.co/600x340/3d6b44/white?text=Sem+Imagem"; }}
        />
        {imagens.length > 1 && (
          <>
            <button className="carousel-btn carousel-btn-prev" onClick={prev}>‹</button>
            <button className="carousel-btn carousel-btn-next" onClick={next}>›</button>
            <div className="carousel-dots">
              {imagens.map((_, i) => (
                <span
                  key={i}
                  className={`dot${i === idx ? " dot-active" : ""}`}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="card-body">
        <span className="badge-tipo" style={{
          background: cfg.badge,
          color: cfg.dark ? "#1e2e22" : "#fff",
        }}>
          {cfg.icon} {atracao.tipo}
        </span>
        <h3 className="card-title">{atracao.nome}</h3>
        <p className="card-desc">{atracao.descricao}</p>
      </div>
    </div>
  );
}
