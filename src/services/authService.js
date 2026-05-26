const SESSION_KEY = "tere_verde_admin";
const CREDENTIALS = { usuario: "admin", senha: "admin" };

export function login(usuario, senha) {
  if (usuario === CREDENTIALS.usuario && senha === CREDENTIALS.senha) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}
