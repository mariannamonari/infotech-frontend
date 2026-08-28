import { useState } from "react";
import { Link } from "react-router-dom";
import PListagemProduto from "./PListagemProduto";
import PListagemCategoria from "./PListagemCategoria";
import PListagemMovimentacao from "./PListagemMovimentacao";

type TipoListagem = "produto" | "categoria" | "movimentacao";

function PListagem() {
    const [tipoListagem, setTipoListagem] = useState<TipoListagem>("produto");

    return (
        <main className="pagina">
            <div className="acoes-home">
                <Link to="/cadastro">Novo Cadastro</Link>
            </div>

            <div className="container-listagem">
                <div className="abas-listagem">
                    <button
                        className={`aba ${tipoListagem === "produto" ? "ativa" : ""}`}
                        onClick={() => setTipoListagem("produto")}
                    >
                        Produtos
                    </button>
                    <button
                        className={`aba ${tipoListagem === "categoria" ? "ativa" : ""}`}
                        onClick={() => setTipoListagem("categoria")}
                    >
                        Categorias
                    </button>
                    <button
                        className={`aba ${tipoListagem === "movimentacao" ? "ativa" : ""}`}
                        onClick={() => setTipoListagem("movimentacao")}
                    >
                        Movimentações
                    </button>
                </div>

                <div className="conteudo-listagem">
                    {tipoListagem === "produto" && <PListagemProduto />}
                    {tipoListagem === "categoria" && <PListagemCategoria />}
                    {tipoListagem === "movimentacao" && <PListagemMovimentacao />}
                </div>
            </div>
        </main>
    );
}

export default PListagem;