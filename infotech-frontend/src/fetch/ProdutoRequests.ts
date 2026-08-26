import type { ProdutoDTO } from "../dto/ProdutoDTO";

const URL_API = "http://localhost:3333";

export async function listarProdutos(): Promise<ProdutoDTO[]> {
    const resposta = await fetch(`${URL_API}/produtos`);

    if (!resposta.ok) {
        throw new Error("Erro ao listar produtos");
    }

    return await resposta.json();
}

export async function buscarProduto(id: number): Promise<ProdutoDTO> {
    const resposta = await fetch(`${URL_API}/produtos/${id}`);

    if (!resposta.ok) {
        throw new Error("Produto não encontrado");
    }

    return await resposta.json();
}

export async function cadastrarProduto(
    produto: ProdutoDTO
): Promise<ProdutoDTO> {
    const resposta = await fetch(`${URL_API}/produtos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar produto");
    }

    return dados;
}

export async function listarProdutosReposicao(): Promise<ProdutoDTO[]> {
    const resposta = await fetch(`${URL_API}/produtos/reposicao`);

    if (!resposta.ok) {
        throw new Error("Erro ao listar produtos para reposição");
    }

    return await resposta.json();
}