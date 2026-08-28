import { useEffect, useState } from "react";
import type { CategoriaDTO } from "../../dto/CategoriaDTO";
import { listarCategorias } from "../../fetch/CategoriaRequests";

function PListagemCategoria() {
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function carregarCategorias() {
        try {
            setCarregando(true);
            const dados = await listarCategorias();
            setCategorias(dados);
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            }
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarCategorias();
    }, []);

    return (
        <div className="listagem-categorias">
            <h2>Categorias</h2>

            {erro && <p className="erro">{erro}</p>}

            {carregando ? (
                <p>Carregando categorias...</p>
            ) : categorias.length === 0 ? (
                <p>Nenhuma categoria cadastrada.</p>
            ) : (
                <div className="grid-categorias">
                    {categorias.map((categoria) => (
                        <div key={categoria.id_categoria} className="card-categoria">
                            <h3>{categoria.nome}</h3>
                            <p>ID: {categoria.id_categoria}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PListagemCategoria;
