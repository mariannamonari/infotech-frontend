import { useState } from "react";
import FormProduto from "../../components/FormProduto/FormProduto";
import FormCategoria from "../../components/FormCategoria/FormCategoria";
import FormMovimentacao from "../../components/FormMovimentacao/FormMovimentacao";
import { Link } from "react-router-dom";

type TipoCadastro = "produto" | "categoria" | "movimentacao";

function PCadastro() {
    const [tipoCadastro, setTipoCadastro] = useState<TipoCadastro>("produto");

    return (
        <main className="pagina">
            <div className="acoes-home">
                <Link to="/produtos">← Voltar</Link>
            </div>

            <div className="container-cadastro">
                <div className="abas-cadastro">
                    <button
                        className={`aba ${tipoCadastro === "produto" ? "ativa" : ""}`}
                        onClick={() => setTipoCadastro("produto")}
                    >
                        Produto
                    </button>
                    <button
                        className={`aba ${tipoCadastro === "categoria" ? "ativa" : ""}`}
                        onClick={() => setTipoCadastro("categoria")}
                    >
                        Categoria
                    </button>
                    <button
                        className={`aba ${tipoCadastro === "movimentacao" ? "ativa" : ""}`}
                        onClick={() => setTipoCadastro("movimentacao")}
                    >
                        Movimentação
                    </button>
                </div>

                <div className="conteudo-cadastro">
                    {tipoCadastro === "produto" && <FormProduto />}
                    {tipoCadastro === "categoria" && <FormCategoria />}
                    {tipoCadastro === "movimentacao" && <FormMovimentacao />}
                </div>
            </div>
        </main>
    );
}

export default PCadastro;