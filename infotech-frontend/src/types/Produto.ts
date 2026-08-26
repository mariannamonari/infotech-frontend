/**
 * Representa um produto exatamente como ele é retornado pelo backend
 * (tabela `produto`).
 */
export interface Produto {
  id_produto: number;
  id_categoria: number;
  codigo: string;
  nome: string;
  descricao: string | null;
  preco_unitario: number;
  quantidade_disponivel: number;
  quantidade_minima: number;
  ativo: boolean;
  data_cadastro: string;
}

/**
 * Dados necessários para cadastrar um novo produto.
 * Não inclui campos gerados pelo banco (id, ativo, data_cadastro).
 */
export interface NovoProduto {
  id_categoria: number;
  codigo: string;
  nome: string;
  descricao: string | null;
  preco_unitario: number;
  quantidade_disponivel: number;
  quantidade_minima: number;
}

/**
 * Formato "bruto" dos campos do formulário, onde tudo chega como texto
 * vindo dos inputs antes de ser validado e convertido para NovoProduto.
 */
export interface NovoProdutoFormValores {
  idCategoria: string;
  codigo: string;
  nome: string;
  descricao: string;
  precoUnitario: string;
  quantidadeDisponivel: string;
  quantidadeMinima: string;
}