import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes delegar a la lógica de Logout.ts o limpiar token directamente
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between bg-primary text-white px-6 py-4 shadow-md">
            <div
                className="text-2xl font-bold cursor-pointer"
                onClick={() => navigate("/resumen")}
            >
                Ahorrista
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="hover:underline font-semibold"
                >
                    Resumen de Gastos
                </button>
                <button
                    onClick={() => navigate("/filtrar")}
                    className="hover:underline font-semibold"
                >
                    Filtrar Gastos
                </button>
                <button
                    onClick={() => navigate("/registrar/gasto")}
                    className="hover:underline font-semibold"
                >
                    Registrar Gasto
                </button>
                <button
                    id="logout"
                    onClick={handleLogout}
                    className="bg-white text-primary font-bold px-4 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
