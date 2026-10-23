import { obterToken, removerToken } from "../utils/Auth";

export async function fetchAutenticado(
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> {
    const token = obterToken();
    const headers = new Headers(init.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const resposta = await fetch(input, { ...init, headers });

    if (resposta.status === 401) {
        removerToken();
    }

    return resposta;
}