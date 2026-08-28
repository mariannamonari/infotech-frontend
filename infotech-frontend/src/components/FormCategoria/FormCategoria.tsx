import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { CategoriaDTO } from "../../dto/CategoriaDTO";
import {
    cadastrarCategoria,
    listarCategorias,
    atualizarCategoria,
    deletarCategoria
} from "../../fetch/CategoriaRequests";
import "./FormCategoria.css";

function FormCategoria() {
    const [nome, setNome] = useState("");
    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    const [categoriaEditando, setCategoriaEditando] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState("");
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

    async function enviarFormulario(event: FormEvent) {
        event.preventDefault();

        setMensagem("");
        setErro("");

        if (!nome.trim()) {
            setErro("O nome da categoria é obrigatório.");
            return;
        }

        try {
            if (categoriaEditando) {
                await atualizarCategoria(categoriaEditando, { nome: nome.trim() });
                setMensagem("Categoria atualizada com sucesso!");
            } else {
                await cadastrarCategoria({ nome: nome.trim() });
                setMensagem("Categoria cadastrada com sucesso!");
            }

            setNome("");
            setCategoriaEditando(null);
            await carregarCategorias();
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Erro ao salvar categoria.");
            }
        }
    }

    async function excluirCategoria(id: number) {
        if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) {
            return;
        }

        try {
            await deletarCategoria(id);
            setMensagem("Categoria deletada com sucesso!");
            await carregarCategorias();
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Erro ao deletar categoria.");
            }
        }
    }

    function editarCategoria(categoria: CategoriaDTO) {
        setNome(categoria.nome);
        setCategoriaEditando(categoria.id_categoria || null);
    }

    function cancelarEdicao() {
        setNome("");
        setCategoriaEditando(null);
    }

    return (
        <div className="container-categorias">
            <form className="form-categoria" onSubmit={enviarFormulario}>
                <h2>{categoriaEditando ? "Editar Categoria" : "Cadastrar Categoria"}</h2>

                {erro && <p className="mensagem-erro">{erro}</p>}
                {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

                <label>Nome da Categoria</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Ex: Eletrônicos"
                />

                <div className="botoes-form">
                    <button type="submit">
                        {categoriaEditando ? "Atualizar" : "Cadastrar"}
                    </button>
                    {categoriaEditando && (
                        <button
                            type="button"
                            className="botao-cancelar"
                            onClick={cancelarEdicao}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="lista-categorias">
                <h2>Categorias Cadastradas</h2>

                {carregando ? (
                    <p>Carregando categorias...</p>
                ) : categorias.length === 0 ? (
                    <p>Nenhuma categoria cadastrada.</p>
                ) : (
                    <div className="tabela-categorias">
                        {categorias.map((categoria) => (
                            <div
                                key={categoria.id_categoria}
                                className="categoria-item"
                            >
                                <span>{categoria.nome}</span>
                                <div className="acoes-categoria">
                                    <button
                                        className="botao-editar"
                                        onClick={() => editarCategoria(categoria)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="botao-deletar"
                                        onClick={() =>
                                            categoria.id_categoria &&
                                            excluirCategoria(categoria.id_categoria)
                                        }
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormCategoria;
