import { useEffect, useState } from "react";
import ListagemProdutos from "../../components/ListagemProdutos/ListagemProdutos";
import { ProdutoDTO } from "../../dto/ProdutoDTO";
import {
    listarProdutos,
    listarProdutosReposicao
} from "../../fetch/ProdutoRequests";

function PListagem() {
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
        <main className="pagina">
            <h1>Produtos</h1>

            {erro && <p>{erro}</p>}

            <ListagemProdutos produtos={produtos} />

            <hr />

            <h2>Produtos para reposição</h2>

            {produtosReposicao.length === 0 ? (
                <p>Nenhum produto precisa de reposição.</p>
            ) : (
                <ListagemProdutos produtos={produtosReposicao} />
            )}
        </main>
    );
}

export default PListagem;