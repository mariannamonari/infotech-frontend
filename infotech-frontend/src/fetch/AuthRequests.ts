import type { LoginRequest, LoginResponse } from "../types/Auth";

const URL_API = "http://localhost:3333";

export async function fazerLogin(
    credenciais: LoginRequest
): Promise<LoginResponse> {
    const resposta = await fetch(`${URL_API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credenciais)
    });

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "E-mail ou senha inválidos.");
    }

    const token = dados.token || dados.access_token;
    if (!token) {
        throw new Error("A resposta do servidor não contém um token de acesso.");
    }

    return dados;
}