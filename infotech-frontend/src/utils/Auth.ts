const CHAVE_TOKEN = "infotech_token";

export function obterToken(): string | null {
    return localStorage.getItem(CHAVE_TOKEN);
}

export function salvarToken(token: string): void {
    localStorage.setItem(CHAVE_TOKEN, token);
}

export function removerToken(): void {
    localStorage.removeItem(CHAVE_TOKEN);
}

export function estaAutenticado(): boolean {
    return Boolean(obterToken());
}