import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategorias } from "@hooks/useCategorias";
import DinosaurioAhorrador from "@assets/DinosaurioAhorrador.png";

export default function RegistrarGastoPage() {
    const navigate = useNavigate();
    const { categorias, loading, error } = useCategorias();

    const [anio, setAnio] = useState<number | null>(null);
    const [mes, setMes] = useState<number | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const [paginaCategoria, setPaginaCategoria] = useState(0);
    const [amount, setAmount] = useState<number | null>(null);

    const categoriasPorPagina = 5;
    const totalPaginas = Math.ceil(categorias.length / categoriasPorPagina);

    const categoriasPaginadas = categorias.slice(
        paginaCategoria * categoriasPorPagina,
        (paginaCategoria + 1) * categoriasPorPagina
    );

    const handleCancelar = () => {
        navigate(-1);
    };

    const handleGuardar = () => {
        // TODO: implementar envío del gasto al backend con POST /expenses
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
                {/* Formulario */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Registrar Gasto
                    </h1>

                    {loading && <p>Cargando categorías...</p>}
                    {error && <p>Error al cargar categorías: {error.message}</p>}

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
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Categoría</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={categoriaSeleccionada ?? ""}
                                onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))}
                            >
                                <option value="" disabled>Selecciona una categoría</option>
                                {categoriasPaginadas.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            {/* Controles de paginación */}
                            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                                <button
                                    type="button"
                                    className="hover:underline disabled:opacity-30"
                                    disabled={paginaCategoria === 0}
                                    onClick={() => setPaginaCategoria((p) => p - 1)}
                                >
                                    ⬅ Anterior
                                </button>
                                <span>Página {paginaCategoria + 1} de {totalPaginas}</span>
                                <button
                                    type="button"
                                    className="hover:underline disabled:opacity-30"
                                    disabled={paginaCategoria >= totalPaginas - 1}
                                    onClick={() => setPaginaCategoria((p) => p + 1)}
                                >
                                    Siguiente ➡
                                </button>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={handleCancelar}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleGuardar}
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                            >
                                Guardar
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