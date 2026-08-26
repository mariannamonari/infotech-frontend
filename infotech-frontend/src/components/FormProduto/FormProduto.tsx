import { useState } from "react";
import type { FormEvent } from "react";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import { cadastrarProduto } from "../../fetch/ProdutoRequests";
import "./FormProduto.css";

function FormProduto() {
    const [idCategoria, setIdCategoria] = useState("");
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [quantidadeMinima, setQuantidadeMinima] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function enviarFormulario(event: FormEvent) {
        event.preventDefault();

        setMensagem("");
        setErro("");

        // VALIDAÇÕES DO FRONTEND

        if (!idCategoria) {
            setErro("A categoria é obrigatória.");
            return;
        }

        if (!codigo.trim()) {
            setErro("O código é obrigatório.");
            return;
        }

        if (!nome.trim()) {
            setErro("O nome é obrigatório.");
            return;
        }

        if (!preco) {
            setErro("O preço unitário é obrigatório.");
            return;
        }

        if (Number(preco) < 0) {
            setErro("O preço não pode ser negativo.");
            return;
        }

        if (Number(quantidade) < 0) {
            setErro("A quantidade disponível não pode ser negativa.");
            return;
        }

        if (Number(quantidadeMinima) < 0) {
            setErro("A quantidade mínima não pode ser negativa.");
            return;
        }

        const produto: ProdutoDTO = {
            id_categoria: Number(idCategoria),
            codigo: codigo.trim(),
            nome: nome.trim(),
            descricao: descricao.trim() || null,
            preco_unitario: Number(preco),
            quantidade_disponivel: Number(quantidade),
            quantidade_minima: Number(quantidadeMinima)
        };

        try {
            await cadastrarProduto(produto);

            setMensagem("Produto cadastrado com sucesso!");

            setIdCategoria("");
            setCodigo("");
            setNome("");
            setDescricao("");
            setPreco("");
            setQuantidade("");
            setQuantidadeMinima("");
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Erro ao cadastrar produto.");
            }
        }
    }

    return (
        <form className="form-produto" onSubmit={enviarFormulario}>
            <h2>Cadastrar Produto</h2>

            {erro && <p className="mensagem-erro">{erro}</p>}

            {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

            <label>Categoria</label>
            <input
                type="number"
                value={idCategoria}
                onChange={(event) => setIdCategoria(event.target.value)}
                placeholder="ID da categoria"
            />

            <label>Código</label>
            <input
                type="text"
                value={codigo}
                onChange={(event) => setCodigo(event.target.value)}
                placeholder="Código do produto"
            />

            <label>Nome</label>
            <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Nome do produto"
            />

            <label>Descrição</label>
            <textarea
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                placeholder="Descrição do produto"
            />

            <label>Preço unitário</label>
            <input
                type="number"
                min="0"
                step="0.01"
                value={preco}
                onChange={(event) => setPreco(event.target.value)}
                placeholder="0,00"
            />

            <label>Quantidade disponível</label>
            <input
                type="number"
                min="0"
                value={quantidade}
                onChange={(event) => setQuantidade(event.target.value)}
                placeholder="Quantidade"
            />

            <label>Quantidade mínima</label>
            <input
                type="number"
                min="0"
                value={quantidadeMinima}
                onChange={(event) =>
                    setQuantidadeMinima(event.target.value)
                }
                placeholder="Quantidade mínima"
            />

            <button type="submit">
                Cadastrar Produto
            </button>
        </form>
    );
}

export default FormProduto;