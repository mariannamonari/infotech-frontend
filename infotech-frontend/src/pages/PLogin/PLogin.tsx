import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { fazerLogin } from "../../fetch/AuthRequests";
import { salvarToken, estaAutenticado } from "../../utils/Auth";
import "../../styles/login.css";

function PLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    if (estaAutenticado()) {
        return <Navigate to="/produtos" replace />;
    }

    async function enviarFormulario(event: FormEvent) {
        event.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const resposta = await fazerLogin({ email: email.trim(), senha });
            salvarToken(resposta.token || resposta.access_token || "");
            const destino = (location.state as { destino?: string } | null)?.destino;
            navigate(destino || "/produtos", { replace: true });
        } catch (error) {
            setErro(error instanceof Error ? error.message : "Não foi possível entrar.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="pagina-login">
            <section className="painel-login">
                <div className="cabecalho-login">
                    <span className="marca-login">INFOTECH</span>
                    <h1>Acesso ao estoque</h1>
                    <p>Entre para gerenciar produtos e movimentações.</p>
                </div>

                <form className="form-login" onSubmit={enviarFormulario}>
                    {erro && <p className="mensagem-erro">{erro}</p>}

                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    <button type="submit" disabled={carregando}>
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default PLogin;