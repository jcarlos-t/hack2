import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "@hooks/useCategorias";
import DinosaurioAhorrador from "@assets/DinosaurioAhorrador.png";
import happy from "@assets/happy.webp";
import { createGasto } from "@services/expenses/createGasto";
import { GastosRequest } from "@interfaces/gastos/GastosRequest";
import { CategoriaGasto } from "@interfaces/categorias/CategoriaGasto";

export default function RegistrarGastoPage() {
    const navigate = useNavigate();
    const { categorias, loading, refreshing, error, refresh } = useCategorias();

    const [anio, setAnio] = useState<number | null>(null);
    const [mes, setMes] = useState<number | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaGasto | null>(null);
    const [busquedaCategoria, setBusquedaCategoria] = useState("");
    const [amount, setAmount] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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
            setShowSuccess(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 4000);
        } catch {
            alert("Error al guardar el gasto");
            setIsSubmitting(false);
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

    if (showSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <img src={happy} alt="Éxito" className="w-64 h-64 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-600 mb-2">¡Gasto registrado con éxito!</h2>
                    <p className="text-gray-600">Redirigiendo al dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
                {/* Formulario */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Registrar Gasto
                    </h1>

                    {loading && (
                        <div className="text-center py-4">
                            <p className="text-gray-600">Cargando categorías...</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-4">
                            <p className="text-red-600">Error al cargar categorías: {error.message}</p>
                            <button 
                                onClick={refresh}
                                className="mt-2 text-primary hover:underline"
                            >
                                Intentar nuevamente
                            </button>
                        </div>
                    )}

                    <form className="space-y-4">
                        {/* Año */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Año</label>
                            <select
                                className="w-full border rounded px-3 py-2"
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
                            <label className="block text-gray-700 font-semibold mb-1">Mes</label>
                            <select
                                className="w-full border rounded px-3 py-2"
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
                            <label className="block text-gray-700 font-semibold mb-1">Monto (S/)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount ?? ""}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Ingresa el monto gastado"
                            />
                        </div>

                        {/* Categoría */}
                        <div className="h-[200px] flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-gray-700 font-semibold">Categoría</label>
                                {!loading && !error && (
                                    <button
                                        type="button"
                                        onClick={refresh}
                                        className="text-sm text-primary hover:underline"
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
                                    className="w-full border rounded px-3 py-2 pr-8"
                                    disabled={loading || refreshing}
                                />
                                {busquedaCategoria && (
                                    <button
                                        type="button"
                                        onClick={() => setBusquedaCategoria("")}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* Lista de categorías */}
                            <div className="flex-1 overflow-y-auto border rounded">
                                {categoriasFiltradas.length === 0 ? (
                                    <div className="p-2 text-center text-gray-500">
                                        No se encontraron categorías
                                    </div>
                                ) : (
                                    categoriasFiltradas.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className={`px-3 py-2 cursor-pointer transition-colors duration-200 ${
                                                categoriaSeleccionada?.id === cat.id 
                                                    ? 'bg-primary text-white' 
                                                    : 'hover:bg-gray-100'
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
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={handleCancelar}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleGuardar}
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Imagen decorativa */}
                <div className="hidden md:block md:w-1/2 bg-gray-50">
                    <img
                        src={DinosaurioAhorrador}
                        alt="Dinosaurio Ahorrador"
                        className="object-cover h-full w-full"
                    />
                </div>
            </div>
        </main>
    );
}