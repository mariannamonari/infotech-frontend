import { BrowserRouter, Route, Routes } from "react-router-dom";

import PListagem from "./pages/PListagem/PListagem";
import PCadastro from "./pages/PCadastro/PCadastro";
import PCategoria from "./pages/PCategoria/PCategoria";
import PMovimentacao from "./pages/PMovimentacao/PMovimentacao";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<PListagem />}
                />

                <Route
                    path="/produtos"
                    element={<PListagem />}
                />

                <Route
                    path="/cadastro"
                    element={<PCadastro />}
                />

                <Route
                    path="/categorias"
                    element={<PCategoria />}
                />

                <Route
                    path="/movimentacoes"
                    element={<PMovimentacao />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;