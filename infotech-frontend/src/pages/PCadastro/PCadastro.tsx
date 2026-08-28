import { Link } from "react-router-dom";
import FormProduto from "../../components/FormProduto/FormProduto";
import "./PCadastro.css";

function PCadastro() {
    return (
        <main className="pagina">
            <div className="acoes-home">
                <Link to="/">← Voltar</Link>
            </div>
            <FormProduto />
        </main>
    );
}

export default PCadastro;