import { Link } from "react-router-dom";
import FormMovimentacao from "../../components/FormMovimentacao/FormMovimentacao";

function PMovimentacao() {
    return (
        <main className="pagina">
            <div className="acoes-home">
                <Link to="/">← Voltar</Link>
            </div>
            <h1>Registrar Movimentação</h1>
            <FormMovimentacao />
        </main>
    );
}

export default PMovimentacao;
