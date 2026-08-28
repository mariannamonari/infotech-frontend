export interface MovimentacaoDTO {
    id_movimentacao?: number;
    id_produto: number;
    id_movimentacao_origem?: number | null;
    tipo: string; // 'ENTRADA' | 'SAIDA' | 'AJUSTE' etc
    motivo: string; // 'COMPRA' | 'VENDA' | 'DEVOLUCAO' etc
    quantidade: number;
    preco_unitario_praticado?: number | null;
    valor_total?: number | null;
    observacao: string;
    data_movimentacao?: string;
}
