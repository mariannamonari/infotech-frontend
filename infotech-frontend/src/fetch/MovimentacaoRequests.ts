import type { MovimentacaoDTO } from "../dto/MovimentacaoDTO";
import { API_URL } from "../config/api";

export async function listarMovimentacoes(): Promise<MovimentacaoDTO[]> {
    const resposta = await fetch(`${API_URL}/movimentacoes`);

    if (!resposta.ok) {
        throw new Error("Erro ao listar movimentações");
    }

    return await resposta.json();
}

export async function buscarMovimentacao(id: number): Promise<MovimentacaoDTO> {
    const resposta = await fetch(`${API_URL}/movimentacoes/${id}`);

    if (!resposta.ok) {
        throw new Error("Movimentação não encontrada");
    }

    return await resposta.json();
}

export async function listarMovimentacoesPorProduto(
    idProduto: number
): Promise<MovimentacaoDTO[]> {
    const resposta = await fetch(
        `${API_URL}/movimentacoes/produto/${idProduto}`
    );

    if (!resposta.ok) {
        throw new Error("Erro ao listar movimentações do produto");
    }

    return await resposta.json();
}

export async function registrarMovimentacao(
    movimentacao: MovimentacaoDTO
): Promise<MovimentacaoDTO> {
    const resposta = await fetch(`${API_URL}/movimentacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movimentacao)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao registrar movimentação");
    }

    return dados;
}

export async function obterTiposMovimentacao(): Promise<string[]> {
    try {
        const resposta = await fetch(`${API_URL}/movimentacoes/tipos`);

        if (resposta.ok) {
            return await resposta.json();
        }
    } catch (error) {
        console.log("Usando tipos padrão de movimentação");
    }

    // Valores padrão se o endpoint não existir
    return ["ENTRADA", "SAIDA", "AJUSTE", "DEVOLUCAO"];
}

export async function obterMotivosMovimentacao(): Promise<string[]> {
    try {
        const resposta = await fetch(`${API_URL}/movimentacoes/motivos`);

        if (resposta.ok) {
            return await resposta.json();
        }
    } catch (error) {
        console.log("Usando motivos padrão de movimentação");
    }

    // Valores padrão se o endpoint não existir
    return ["COMPRA", "VENDA", "DEVOLUCAO", "TRANSFERENCIA", "AJUSTE_ESTOQUE", "PERDA"];
}
