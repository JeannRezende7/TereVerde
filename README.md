# 🌿 Terê Verde — Ecoturismo Teresópolis

Plataforma web para consulta e gestão de trilhas, cachoeiras e eventos ecoturísticos da região de Teresópolis (RJ).

---

## 🛠️ Tecnologias Utilizadas

Tecnologias:
React, Vite, Firebase, HTML, CSS e JS


## 📱 Responsividade no Android

O layout é **mobile-first**: o ponto de partida é a tela pequena, e breakpoints adicionam colunas conforme o espaço cresce.

### Grid de cards

```css
/* padrão: 1 coluna (celular) */
.atracoes-grid { grid-template-columns: 1fr; }

/* ≥ 640px: 2 colunas (tablet/Android médio) */
@media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }

/* ≥ 960px: 3 colunas (tablet grande / desktop) */
@media (min-width: 960px) { grid-template-columns: repeat(3, 1fr); }
```

Em um celular Android padrão (360–414px de largura), cada card ocupa a largura total da tela, com imagem de 200px de altura e texto legível abaixo.

### Barra de filtros

Usa `flex-wrap: wrap` com `gap`, então os botões de filtro quebram para a próxima linha automaticamente se não couberem — sem overflow horizontal.

### Header

O título usa `clamp(2rem, 8vw, 3.2rem)`, que escala o tamanho da fonte proporcionalmente à largura da viewport, evitando texto cortado ou muito pequeno.

### Painel admin

O formulário e a lista de atrações têm `max-width: 960px` com `margin: 0 auto`, ocupando 100% em celulares e centralizando em telas maiores. Os botões de ação (Editar / Excluir) ficam em coluna no mobile e se alinham naturalmente com o `flexbox` do item.

---

## 🚀 Como Rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## 🔑 Acesso Admin

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `admin` |

---
