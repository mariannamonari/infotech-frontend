import { useEffect, useState } from "react";
import ListagemProdutos from "../../components/ListagemProduto/ListagemPoduto";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import {
    listarProdutos,
    listarProdutosReposicao
} from "../../fetch/ProdutoRequests";

function PListagemProduto() {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [produtosReposicao, setProdutosReposicao] = useState<ProdutoDTO[]>([]);
    const [erro, setErro] = useState("");

    async function carregarProdutos() {
        try {
            const dados = await listarProdutos();
            setProdutos(dados);
        } catch {
            setErro("Não foi possível carregar os produtos.");
        }
    }

    async function carregarReposicao() {
        try {
            const dados = await listarProdutosReposicao();
            setProdutosReposicao(dados);
        } catch {
            console.log("Não foi possível carregar produtos para reposição.");
        }
    }

    useEffect(() => {
        carregarProdutos();
        carregarReposicao();
    }, []);

    return (
        <div className="listagem-produtos">
            <h2>Todos os Produtos</h2>

            {erro && <p className="erro">{erro}</p>}

            <ListagemProdutos produtos={produtos} />

            {produtosReposicao.length > 0 && (
                <>
                    <hr />
                    <h3>Produtos para Reposição</h3>
                    <ListagemProdutos produtos={produtosReposicao} />
                </>
            )}
        </div>
    );
}

export default PListagemProduto;
