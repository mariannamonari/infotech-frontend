import { Link } from "react-router-dom";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";
import { formatarPreco } from "../../utils/Utilitario";
import "./ListagemProdutos.css";

interface Props {
    produtos: ProdutoDTO[];
}

function ListagemProdutos({ produtos }: Props) {
    return (
        <div className="lista-produtos">
            {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                produtos.map((produto) => (
                    <div className="produto" key={produto.id_produto}>
                        <div>
                            <h3>{produto.nome}</h3>

                            <p>
                                <strong>Código:</strong> {produto.codigo}
                            </p>

                            <p>
                                <strong>Preço:</strong>{" "}
                                {formatarPreco(Number(produto.preco_unitario))}
                            </p>

                            <p>
                                <strong>Quantidade:</strong>{" "}
                                {produto.quantidade_disponivel}
                            </p>

                            <p>
                                <strong>Quantidade mínima:</strong>{" "}
                                {produto.quantidade_minima}
                            </p>
                        </div>

                        <Link
                            className="botao-detalhes"
                            to={`/produtos/${produto.id_produto}`}
                        >
                            Ver detalhes
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}

export default ListagemProdutos;