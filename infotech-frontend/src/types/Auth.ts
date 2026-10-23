export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    token?: string;
    access_token?: string;
    usuario?: unknown;
}