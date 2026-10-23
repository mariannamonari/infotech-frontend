import type { CategoriaDTO } from "../dto/CategoriaDTO";
import { API_URL } from "../config/api";

export async function listarCategorias(): Promise<CategoriaDTO[]> {
    const resposta = await fetch(`${API_URL}/categorias`);

    if (!resposta.ok) {
        throw new Error("Erro ao listar categorias");
    }

    return await resposta.json();
}

export async function buscarCategoria(id: number): Promise<CategoriaDTO> {
    const resposta = await fetch(`${API_URL}/categorias/${id}`);

    if (!resposta.ok) {
        throw new Error("Categoria não encontrada");
    }

    return await resposta.json();
}

export async function cadastrarCategoria(
    categoria: CategoriaDTO
): Promise<CategoriaDTO> {
    const resposta = await fetch(`${API_URL}/categorias`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar categoria");
    }

    return dados;
}

export async function atualizarCategoria(
    id: number,
    categoria: CategoriaDTO
): Promise<CategoriaDTO> {
    const resposta = await fetch(`${API_URL}/categorias/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao atualizar categoria");
    }

    return dados;
}

export async function deletarCategoria(id: number): Promise<void> {
    const resposta = await fetch(`${API_URL}/categorias/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        const dados = await resposta.json();
        throw new Error(dados.mensagem || "Erro ao deletar categoria");
    }
}
