import { Navigate, Outlet, useLocation } from "react-router-dom";
import { estaAutenticado } from "../utils/Auth";

function RotaProtegida() {
    const location = useLocation();

    if (!estaAutenticado()) {
        return <Navigate to="/login" state={{ destino: location.pathname }} replace />;
    }

    return <Outlet />;
}

export default RotaProtegida;