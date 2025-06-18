import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "@hooks/useCategorias";
import DinosaurioAhorrador from "@assets/DinosaurioAhorrador.png";
import { createGasto } from "@services/expenses/createGasto";
import { GastosRequest } from "@interfaces/gastos/GastosRequest";
import { CategoriaGasto } from "@interfaces/categorias/CategoriaGasto";
import bgDetailsImg from "@assets/images/bg-details.jpg";

export default function RegistrarGastoPage() {
    const navigate = useNavigate();
    const { categorias, loading, refreshing, error, refresh } = useCategorias();

    const [anio, setAnio] = useState<number | null>(null);
    const [mes, setMes] = useState<number | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaGasto | null>(null);
    const [busquedaCategoria, setBusquedaCategoria] = useState("");
    const [amount, setAmount] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categoriasFiltradas = useMemo(() => {
        return categorias.filter(cat => 
            cat.name.toLowerCase().includes(busquedaCategoria.toLowerCase())
        );
    }, [categorias, busquedaCategoria]);

    const handleCancelar = () => {
        navigate(-1);
    };

    const handleGuardar = async () => {
        if (!anio || !mes || !categoriaSeleccionada || !amount) {
            alert("Por favor complete todos los campos");
            return;
        }

        try {
            setIsSubmitting(true);
            const gastoRequest: GastosRequest = {
                year: anio,
                month: mes,
                category: {
                    id: categoriaSeleccionada.id,
                    name: categoriaSeleccionada.name
                },
                amount: amount
            };

            await createGasto(gastoRequest);
            navigate(-1);
        } catch (error) {
            alert("Error al guardar el gasto. Por favor intente nuevamente.");
            console.error("Error al guardar el gasto:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-x-hidden">
            {/* Fondo decorativo anime */}
            <img src={bgDetailsImg} alt="anime bg" className="fixed inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none select-none" />
            <div className="bg-white/90 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden z-10">
                {/* Formulario */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center flex items-center gap-2">
                        <span role="img" aria-label="kawaii">🌸</span> Registrar Gasto
                    </h1>

                    {loading && (
                        <div className="text-center py-4">
                            <p className="text-purple-400 font-semibold">Cargando categorías...</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-4">
                            <p className="text-red-400 font-semibold">Error al cargar categorías: {error.message}</p>
                            <button 
                                onClick={refresh}
                                className="mt-2 text-purple-500 hover:underline"
                            >
                                Intentar nuevamente
                            </button>
                        </div>
                    )}

                    <form className="space-y-4">
                        {/* Año */}
                        <div>
                            <label className="block text-purple-700 font-semibold mb-1">Año</label>
                            <select
                                className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 bg-white font-semibold"
                                value={anio ?? ""}
                                onChange={(e) => setAnio(Number(e.target.value))}
                            >
                                <option value="" disabled>Selecciona un año</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        {/* Mes */}
                        <div>
                            <label className="block text-purple-700 font-semibold mb-1">Mes</label>
                            <select
                                className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 bg-white font-semibold"
                                value={mes ?? ""}
                                onChange={(e) => setMes(Number(e.target.value))}
                            >
                                <option value="" disabled>Selecciona un mes</option>
                                {[
                                    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                                ].map((nombre, index) => (
                                    <option key={index} value={index + 1}>{nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Monto */}
                        <div>
                            <label className="block text-purple-700 font-semibold mb-1">Monto (S/)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount ?? ""}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 bg-white font-semibold"
                                placeholder="Ingresa el monto gastado"
                            />
                        </div>

                        {/* Categoría */}
                        <div className="h-[200px] flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-purple-700 font-semibold">Categoría</label>
                                {!loading && !error && (
                                    <button
                                        type="button"
                                        onClick={refresh}
                                        className="text-sm text-purple-500 hover:underline"
                                        disabled={refreshing}
                                    >
                                        {refreshing ? "Actualizando..." : "Actualizar categorías"}
                                    </button>
                                )}
                            </div>
                            {/* Barra de búsqueda */}
                            <div className="relative mb-2">
                                <input
                                    type="text"
                                    value={busquedaCategoria}
                                    onChange={(e) => setBusquedaCategoria(e.target.value)}
                                    placeholder="Buscar categoría..."
                                    className="w-full border-2 border-purple-200 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-purple-400 bg-white font-semibold"
                                    disabled={loading || refreshing}
                                />
                                {busquedaCategoria && (
                                    <button
                                        type="button"
                                        onClick={() => setBusquedaCategoria("")}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-700"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            {/* Lista de categorías */}
                            <div className="flex-1 overflow-y-auto border-2 border-purple-100 rounded-lg bg-white/80">
                                {categoriasFiltradas.length === 0 ? (
                                    <div className="p-2 text-center text-purple-300">
                                        No se encontraron categorías
                                    </div>
                                ) : (
                                    categoriasFiltradas.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className={`px-3 py-2 cursor-pointer transition-colors duration-200 rounded-lg font-semibold ${
                                                categoriaSeleccionada?.id === cat.id 
                                                    ? 'bg-purple-400 text-white' 
                                                    : 'hover:bg-purple-50 text-purple-700'
                                            }`}
                                            onClick={() => setCategoriaSeleccionada(cat)}
                                        >
                                            {cat.name}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-between mt-6 gap-2">
                            <button
                                type="button"
                                onClick={handleCancelar}
                                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 font-bold shadow-sm transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleGuardar}
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 font-bold shadow-md transition-colors disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Imagen decorativa kawaii */}
                <div className="hidden md:flex md:w-1/2 bg-purple-50 flex-col items-center justify-center relative">
                    <img
                        src={DinosaurioAhorrador}
                        alt="Dinosaurio Ahorrador"
                        className="object-contain h-64 w-full drop-shadow-xl mt-8"
                    />
                </div>
            </div>
        </main>
    );
}