import { useEffect, useState } from "react";
import type { MovimentacaoDTO } from "../../dto/MovimentacaoDTO";
import { listarMovimentacoes } from "../../fetch/MovimentacaoRequests";

function PListagemMovimentacao() {
    const [movimentacoes, setMovimentacoes] = useState<MovimentacaoDTO[]>([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function carregarMovimentacoes() {
        try {
            setCarregando(true);
            const dados = await listarMovimentacoes();
            setMovimentacoes(dados);
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            }
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarMovimentacoes();
    }, []);

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatarMoeda = (valor: number | null | undefined) => {
        if (!valor) return "—";
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valor);
    };

    return (
        <div className="listagem-movimentacoes">
            <h2>Movimentações</h2>

            {erro && <p className="erro">{erro}</p>}

            {carregando ? (
                <p>Carregando movimentações...</p>
            ) : movimentacoes.length === 0 ? (
                <p>Nenhuma movimentação registrada.</p>
            ) : (
                <div className="tabela-movimentacoes">
                    <div className="tabela-header">
                        <div className="col-id">ID</div>
                        <div className="col-tipo">Tipo</div>
                        <div className="col-motivo">Motivo</div>
                        <div className="col-qtd">Quantidade</div>
                        <div className="col-valor">Valor Total</div>
                        <div className="col-data">Data</div>
                    </div>

                    {movimentacoes.map((mov) => (
                        <div key={mov.id_movimentacao} className="tabela-row">
                            <div className="col-id">#{mov.id_movimentacao}</div>
                            <div className="col-tipo">
                                <span className={`badge badge-${mov.tipo.toLowerCase()}`}>
                                    {mov.tipo}
                                </span>
                            </div>
                            <div className="col-motivo">{mov.motivo}</div>
                            <div className="col-qtd">{mov.quantidade}</div>
                            <div className="col-valor">{formatarMoeda(mov.valor_total)}</div>
                            <div className="col-data">{formatarData(mov.data_movimentacao || "")}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PListagemMovimentacao;
