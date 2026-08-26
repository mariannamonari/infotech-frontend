import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navegacao from "./components/Navegacao/Navegacao";

import PHome from "./pages/PHome/PHome";
import PListagem from "./pages/PListagem/PListagem";
import PCadastro from "./pages/PCadastro/PCadastro";
import PDetalhes from "./pages/PDetalhes/PDetalhes";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navegacao />

            <Routes>
                <Route path="/" element={<PHome />} />

                <Route
                    path="/produtos"
                    element={<PListagem />}
                />

                <Route
                    path="/cadastro"
                    element={<PCadastro />}
                />

                <Route
                    path="/produtos/:id"
                    element={<PDetalhes />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;