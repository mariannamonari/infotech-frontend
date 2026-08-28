/**
 * Representa uma movimentação exatamente como ela é retornada pelo backend
 * (tabela `movimentacao`).
 */
export interface Movimentacao {
  id_movimentacao: number;
  id_produto: number;
  id_movimentacao_origem: number | null;
  tipo: string;
  motivo: string;
  quantidade: number;
  preco_unitario_praticado: number | null;
  valor_total: number | null;
  observacao: string;
  data_movimentacao: string;
}

/**
 * Dados necessários para registrar uma nova movimentação.
 * Não inclui campos gerados pelo banco (id_movimentacao, data_movimentacao).
 */
export interface RegistrarMovimentacaoRequest {
  id_produto: number;
  id_movimentacao_origem?: number | null;
  tipo: string;
  motivo: string;
  quantidade: number;
  preco_unitario_praticado?: number | null;
  valor_total?: number | null;
  observacao: string;
}
