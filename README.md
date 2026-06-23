# 🌿 Terê Verde — Ecoturismo Teresópolis

Plataforma web para consulta e gestão de trilhas, cachoeiras e eventos ecoturísticos da região de Teresópolis (RJ).

---

## 👥 Integrante da Equipe

— Jeann Rezende de Jesus 

---

## 🎯 Situação-Problema

Teresópolis possui diversas trilhas, cachoeiras e eventos ecoturísticos, porém sem uma plataforma centralizada para divulgação e gestão dessas atrações. Turistas não têm fácil acesso às informações e administradores do circuito dependem de meios manuais para divulgar novidades.

---

## 📋 Descrição do MVP

O **Terê Verde** é uma plataforma web mobile-first que permite a turistas consultar atrações ecoturísticas de Teresópolis (RJ) com filtros por tipo, e a administradores cadastrar, editar e excluir atrações em tempo real via painel protegido por login.

---

## ✅ Requisitos Funcionais

— O sistema deve listar todas as atrações cadastradas na tela pública.
— O sistema deve permitir filtrar atrações por tipo: Trilha, Cachoeira ou Evento.
— Cada atração deve exibir nome, descrição, tipo e até 3 imagens em carrossel.
— O administrador deve conseguir fazer login com usuário e senha.
— O administrador deve conseguir cadastrar novas atrações com tipo, nome, descrição e imagens.
— O administrador deve conseguir editar atrações já cadastradas.
— O administrador deve conseguir excluir atrações cadastradas.

## ⚙️ Requisitos Não-Funcionais

— O layout deve ser responsivo e funcionar em dispositivos Android (mobile-first).
— Os dados devem ser integrados na nuvem via Firebase Firestore.
— O sistema deve possuir interface intuitiva e permitir que os usuários encontrem as informações desejadas de forma rápida e simples.

---

## 🚫 Escopo — O que o MVP não faz

- Não permite upload direto de imagens — as imagens são adicionadas por URL pública.
- Não possui sistema de avaliações ou comentários dos turistas.
- Não envia notificações push ou e-mails.
- Não possui controle de múltiplos administradores com diferentes permissões.

---

## 🛠️ Tecnologias Utilizadas

— React, Vite, Firebase, HTML, CSS e JS

---

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

## 📁 Estrutura de Pastas

```
tere-verde/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/                        ← código-fonte
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── AtracaoCard.jsx
    │   └── Toast.jsx
    ├── services/
    │   ├── firebase.js
    │   ├── authService.js
    │   └── atracaoService.js
    └── pages/
        ├── IndexPage.jsx
        └── AdminPage.jsx
```

---

## 🚀 Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/tere-verde.git
cd tere-verde

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```
---

## 🔑 Acesso Admin

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `@dmin1` |

---
