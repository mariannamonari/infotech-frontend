import { Link } from "react-router-dom";
import FormCategoria from "../../components/FormCategoria/FormCategoria";

function PCategoria() {
    return (
        <main className="pagina">
            <div className="acoes-home">
                <Link to="/">← Voltar</Link>
            </div>
            <h1>Gerenciar Categorias</h1>
            <FormCategoria />
        </main>
    );
}

export default PCategoria;
