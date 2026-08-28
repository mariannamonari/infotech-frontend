/**
 * Representa uma categoria exatamente como ela é retornada pelo backend
 * (tabela `categoria`).
 */
export interface Categoria {
  id_categoria: number;
  nome: string;
}

/**
 * Dados necessários para cadastrar uma nova categoria.
 * Não inclui campos gerados pelo banco (id_categoria).
 */
export interface CadastrarCategoriaRequest {
  nome: string;
}
