export function formatarPreco(valor: number): string {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

export function formatarData(data: string): string {
    return new Date(data).toLocaleDateString("pt-BR");
}