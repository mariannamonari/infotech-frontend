import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { MovimentacaoDTO } from "../../dto/MovimentacaoDTO";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import {
    registrarMovimentacao,
    obterTiposMovimentacao,
    obterMotivosMovimentacao
} from "../../fetch/MovimentacaoRequests";
import { listarProdutos } from "../../fetch/ProdutoRequests";
import "./FormMovimentacao.css";

function FormMovimentacao() {
    const [idProduto, setIdProduto] = useState("");
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [tipo, setTipo] = useState("");
    const [tipos, setTipos] = useState<string[]>([]);
    const [motivo, setMotivo] = useState("");
    const [motivos, setMotivos] = useState<string[]>([]);
    const [quantidade, setQuantidade] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState("");
    const [observacao, setObservacao] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function carregarDados() {
        try {
            setCarregando(true);
            const produtosData = await listarProdutos();
            setProdutos(produtosData);

            // Carregar tipos e motivos em paralelo com tratamento de erro individual
            try {
                const tiposData = await obterTiposMovimentacao();
                setTipos(tiposData);
            } catch (error) {
                console.error("Erro ao carregar tipos:", error);
                setTipos(["ENTRADA", "SAIDA", "AJUSTE", "DEVOLUCAO"]);
            }

            try {
                const motivosData = await obterMotivosMovimentacao();
                setMotivos(motivosData);
            } catch (error) {
                console.error("Erro ao carregar motivos:", error);
                setMotivos(["COMPRA", "VENDA", "DEVOLUCAO", "TRANSFERENCIA", "AJUSTE_ESTOQUE", "PERDA"]);
            }
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            }
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    async function enviarFormulario(event: FormEvent) {
        event.preventDefault();

        setMensagem("");
        setErro("");

        if (!idProduto) {
            setErro("O produto é obrigatório.");
            return;
        }

        if (!tipo) {
            setErro("O tipo de movimentação é obrigatório.");
            return;
        }

        if (!motivo) {
            setErro("O motivo é obrigatório.");
            return;
        }

        if (!quantidade || Number(quantidade) <= 0) {
            setErro("A quantidade deve ser maior que zero.");
            return;
        }

        if (!observacao.trim()) {
            setErro("A observação é obrigatória.");
            return;
        }

        const movimentacao: MovimentacaoDTO = {
            id_produto: Number(idProduto),
            tipo,
            motivo,
            quantidade: Number(quantidade),
            preco_unitario_praticado: precoUnitario ? Number(precoUnitario) : null,
            observacao: observacao.trim()
        };

        try {
            await registrarMovimentacao(movimentacao);
            setMensagem("Movimentação registrada com sucesso!");

            setIdProduto("");
            setTipo("");
            setMotivo("");
            setQuantidade("");
            setPrecoUnitario("");
            setObservacao("");
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Erro ao registrar movimentação.");
            }
        }
    }

    return (
        <form className="form-movimentacao" onSubmit={enviarFormulario}>
            <h2>Registrar Movimentação</h2>

            {erro && <p className="mensagem-erro">{erro}</p>}
            {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

            {carregando ? (
                <p>Carregando dados...</p>
            ) : (
                <>
                    <label>Produto</label>
                    <select
                        value={idProduto}
                        onChange={(event) => setIdProduto(event.target.value)}
                        required
                    >
                        <option value="">Selecione um produto</option>
                        {produtos.map((produto) => (
                            <option key={produto.id_produto} value={produto.id_produto}>
                                {produto.nome} (Código: {produto.codigo})
                            </option>
                        ))}
                    </select>

                    <label>Tipo de Movimentação</label>
                    <select
                        value={tipo}
                        onChange={(event) => setTipo(event.target.value)}
                        required
                    >
                        <option value="">Selecione um tipo</option>
                        {tipos.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    <label>Motivo</label>
                    <select
                        value={motivo}
                        onChange={(event) => setMotivo(event.target.value)}
                        required
                    >
                        <option value="">Selecione um motivo</option>
                        {motivos.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>

                    <label>Quantidade</label>
                    <input
                        type="number"
                        min="1"
                        value={quantidade}
                        onChange={(event) => setQuantidade(event.target.value)}
                        placeholder="Quantidade"
                        required
                    />

                    <label>Preço Unitário (opcional)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={precoUnitario}
                        onChange={(event) => setPrecoUnitario(event.target.value)}
                        placeholder="0,00"
                    />

                    <label>Observação</label>
                    <textarea
                        value={observacao}
                        onChange={(event) => setObservacao(event.target.value)}
                        placeholder="Descreva os detalhes da movimentação"
                        required
                    />

                    <button type="submit">Registrar Movimentação</button>
                </>
            )}
        </form>
    );
}

export default FormMovimentacao;
