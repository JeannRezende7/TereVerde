import { getAtracoes, addAtracao, deleteAtracao } from "./firebase.js";

export async function listarAtracoesService() {
  return await getAtracoes();
}

export async function cadastrarAtracaoService(tipo, nome, descricao, arrayImagens) {
  if (!tipo || !nome || !descricao) {
    throw new Error("Preencha todos os campos obrigatórios (*).");
  }
  const imagensValidas = arrayImagens.map((url) => url.trim()).filter(Boolean);
  return await addAtracao({ tipo, nome, descricao, imagens: imagensValidas });
}

export async function excluirAtracaoService(id) {
  if (!id) throw new Error("ID inválido para exclusão.");
  await deleteAtracao(id);
}

export async function editarAtracaoService(id, tipo, nome, descricao, arrayImagens) {
  if (!tipo || !nome || !descricao) {
    throw new Error("Preencha todos os campos obrigatórios (*).");
  }
  const imagensValidas = arrayImagens.map((url) => url.trim()).filter(Boolean);
  const { updateAtracao } = await import("./firebase.js");
  await updateAtracao(id, { tipo, nome, descricao, imagens: imagensValidas });
}
