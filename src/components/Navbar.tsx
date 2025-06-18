import { useNavigate } from "react-router-dom";
import avatarImg from "@assets/images/avatar.png";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 relative">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/dashboard")}> 
                <img
                    src={avatarImg}
                    alt="avatar otaku"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200"
                />
                <span className="text-2xl font-bold text-white drop-shadow-lg tracking-wide select-none">
                    Ahorrista
                </span>
                <span className="ml-2 text-xs bg-white/30 text-white px-2 py-1 rounded-full animate-bounce">v2.0</span>
            </div>
            <div className="flex space-x-4 items-center">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-1 hover:bg-white/20 px-3 py-2 rounded-lg font-semibold transition-colors"
                >
                    <span role="img" aria-label="resumen">📊</span> Resumen
                </button>
                <button
                    onClick={() => navigate("/filtrar")}
                    className="flex items-center gap-1 hover:bg-white/20 px-3 py-2 rounded-lg font-semibold transition-colors"
                >
                    <span role="img" aria-label="filtrar">🔎</span> Filtrar
                </button>
                <button
                    onClick={() => navigate("/registrar/gasto")}
                    className="flex items-center gap-1 hover:bg-white/20 px-3 py-2 rounded-lg font-semibold transition-colors"
                >
                    <span role="img" aria-label="nuevo">📝</span> Registrar
                </button>
                <button
                    id="logout"
                    onClick={handleLogout}
                    className="bg-white text-purple-600 font-bold px-4 py-1 rounded hover:bg-gray-200 transition-colors border border-purple-300 shadow-sm ml-2"
                >
                    Salir
                </button>
            </div>
        </nav>
    );
}
