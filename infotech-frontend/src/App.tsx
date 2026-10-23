import { BrowserRouter, Route, Routes } from "react-router-dom";

import RotaProtegida from "./components/RotaProtegida";
import PLogin from "./pages/PLogin/PLogin";
import PListagem from "./pages/PListagem/PListagem";
import PCadastro from "./pages/PCadastro/PCadastro";

import "./styles/pages.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PLogin />} />
                <Route element={<RotaProtegida />}>
                    <Route path="/" element={<PListagem />} />
                    <Route path="/produtos" element={<PListagem />} />
                    <Route path="/cadastro" element={<PCadastro />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;