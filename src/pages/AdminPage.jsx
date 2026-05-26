import { useState, useEffect } from "react";
import { login, logout, isAuthenticated } from "../services/authService.js";
import { listarAtracoesService, cadastrarAtracaoService, excluirAtracaoService } from "../services/atracaoService.js";
import { updateAtracao } from "../services/firebase.js";
import { useToast } from "../components/Toast.jsx";

const TIPO_CONFIG = {
  Trilha:    { badge: "#3d7a52", icon: "🥾" },
  Cachoeira: { badge: "#0dcaf0", icon: "💧", dark: true },
  Evento:    { badge: "#ffc107", icon: "📅", dark: true },
};

const FORM_VAZIO = { tipo: "", nome: "", desc: "", imgs: ["", "", ""] };

function LoginScreen({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha]     = useState("");
  const [erro, setErro]       = useState(false);

  const handleLogin = () => {
    if (login(usuario, senha)) { setErro(false); onLogin(); }
    else setErro(true);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2>🔒 Acesso Restrito</h2>
        {erro && <div className="alert-danger mb-3">Usuário ou senha incorretos.</div>}
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input type="text" className="form-control" placeholder="admin"
            value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" />
        </div>
        <div className="mb-4">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" placeholder="••••••••"
            value={senha} onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} autoComplete="current-password" />
        </div>
        <button className="btn-cadastrar" onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}

function AdminPanel({ onLogout }) {
  const showToast = useToast();
  const [atracoes, setAtracoes]     = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [salvando, setSalvando]     = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [tipo, setTipo] = useState("");
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [imgs, setImgs] = useState(["", "", ""]);

  const setImg = (i, val) => setImgs((prev) => prev.map((v, idx) => idx === i ? val : v));

  const resetForm = () => {
    setEditandoId(null);
    setTipo(""); setNome(""); setDesc(""); setImgs(["", "", ""]);
  };

  const carregarLista = async () => {
    setLoadingList(true);
    try {
      setAtracoes(await listarAtracoesService());
    } catch {
      showToast("Erro ao carregar atrações.", "danger");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => { carregarLista(); }, []);

  const iniciarEdicao = (atr) => {
    setEditandoId(atr.id);
    setTipo(atr.tipo);
    setNome(atr.nome);
    setDesc(atr.descricao);
    const imgsPadded = [...(atr.imagens || []), "", "", ""].slice(0, 3);
    setImgs(imgsPadded);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      if (editandoId) {
        const imagensValidas = imgs.map((u) => u.trim()).filter(Boolean);
        await updateAtracao(editandoId, { tipo, nome, descricao: desc, imagens: imagensValidas });
        showToast(`"${nome}" atualizado! ✏️`, "success");
      } else {
        await cadastrarAtracaoService(tipo, nome, desc, imgs);
        showToast(`"${nome}" cadastrado! 🌿`, "success");
      }
      resetForm();
      await carregarLista();
    } catch (err) {
      showToast(err.message || "Erro ao salvar.", "danger");
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async (atr) => {
    if (!confirm(`Excluir "${atr.nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await excluirAtracaoService(atr.id);
      showToast(`"${atr.nome}" removido.`, "info");
      if (editandoId === atr.id) resetForm();
      await carregarLista();
    } catch {
      showToast("Erro ao excluir. Tente novamente.", "danger");
    }
  };

  return (
    <div className="admin-panel">
      <div className="panel-top-bar">
        <p>Bem-vindo, <strong>Administrador</strong>! Gerencie as atrações do Terê Verde.</p>
        <button className="btn-logout" onClick={onLogout}>Sair</button>
      </div>

      <div className="panel-section">
        <h2 className="panel-section-title">
          {editandoId ? "✏️ Editar Atração" : "➕ Nova Atração"}
        </h2>

        <div className="mb-3">
          <label className="form-label">Tipo *</label>
          <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione…</option>
            <option value="Trilha">🥾 Trilha</option>
            <option value="Cachoeira">💧 Cachoeira</option>
            <option value="Evento">📅 Evento</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Nome / Título *</label>
          <input type="text" className="form-control" placeholder="Ex: Cachoeira do Imbuí"
            maxLength={120} value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição *</label>
          <textarea className="form-control" rows={3} placeholder="Descreva a atração…"
            maxLength={600} value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <p className="form-label mb-1">Imagens (cole URLs públicas)</p>
        {imgs.map((url, i) => (
          <div key={i} className="mb-2">
            <input type="url" className="form-control" placeholder={`URL da Imagem ${i + 1}`}
              value={url} onChange={(e) => setImg(i, e.target.value)} />
          </div>
        ))}

        <div className="img-preview-row">
          {imgs.map((url, i) =>
            url.trim() ? (
              <img key={i} src={url} className="img-preview-thumb" alt={`Preview ${i + 1}`} />
            ) : null
          )}
        </div>

        <div className="mt-4" style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <button className="btn-cadastrar" onClick={handleSalvar} disabled={salvando}>
            {salvando ? "Salvando…" : editandoId ? "Salvar Alterações" : "Cadastrar Atração"}
          </button>
          {editandoId && (
            <button className="btn-cancelar" onClick={resetForm}>Cancelar</button>
          )}
        </div>
      </div>

      <div className="panel-section">
        <h2 className="panel-section-title">📋 Atrações Cadastradas</h2>

        {loadingList ? (
          <div className="text-center py-3 text-muted">
            <div className="spinner spinner-sm" /> Carregando…
          </div>
        ) : atracoes.length === 0 ? (
          <p className="text-muted text-center py-3">Nenhuma atração cadastrada ainda.</p>
        ) : (
          atracoes.map((atr) => {
            const cfg = TIPO_CONFIG[atr.tipo] || { badge: "#6c757d", icon: "📍" };
            const esteEditando = editandoId === atr.id;
            return (
              <div key={atr.id} className={`atracao-admin-item${esteEditando ? " editando" : ""}`}>
                <div className="atracao-admin-info">
                  <span className="badge-tipo" style={{
                    background: cfg.badge, color: cfg.dark ? "#1e2e22" : "#fff",
                    marginBottom: ".25rem", display: "inline-block",
                  }}>
                    {cfg.icon} {atr.tipo}
                  </span>
                  <p className="atracao-admin-nome">{atr.nome}</p>
                  <p className="atracao-admin-desc">{atr.descricao}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".4rem", flexShrink: 0 }}>
                  <button className="btn-editar" onClick={() => iniciarEdicao(atr)}>
                    {esteEditando ? "Editando…" : "Editar"}
                  </button>
                  <button className="btn-excluir" onClick={() => handleExcluir(atr)}>Excluir</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function AdminPage({ onNavigateHome }) {
  const [autenticado, setAutenticado] = useState(isAuthenticated());

  const handleLogout = () => { logout(); setAutenticado(false); };

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">🌿 Terê Verde · <span>Admin</span></h1>
        <button className="btn-outline-light" onClick={onNavigateHome}>← Ver Site</button>
      </header>
      {autenticado
        ? <AdminPanel onLogout={handleLogout} />
        : <LoginScreen onLogin={() => setAutenticado(true)} />
      }
    </>
  );
}
