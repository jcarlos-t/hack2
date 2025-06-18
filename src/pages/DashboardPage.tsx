import { useEffect, useState } from "react";
import { getMonthlySummary } from "@services/expenses";
import { CategorySummaryDTO } from "@interfaces/Expenses";
import SummaryTile from "@components/SummaryTitle";
import { useCategorias } from "@hooks/useCategorias";

// importa tus iconos desde assets
import buscarIcon from "@assets/buscar.png";
import encontradoIcon from "@assets/encontrado.png";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function DashboardPage() {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const { categorias, loading: loadingCats } = useCategorias();
  const [summary, setSummary] = useState<CategorySummaryDTO[]>([]);
  const [loadingSum, setLoadingSum] = useState<boolean>(true);

  useEffect(() => {
    setLoadingSum(true);
    getMonthlySummary(month)
      .then((res) => setSummary(res))
      .catch(() => setSummary([]))
      .finally(() => setLoadingSum(false));
  }, [month]);

  const fullData = categorias.map((cat) => {
    const found = summary.find((s) => s.category === cat.name);
    return { category: cat.name, total: found?.total ?? 0 };
  });

  const isLoading = loadingCats || loadingSum;

  return (
    <div className="min-h-screen p-8 bg-teal-50">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* selector de mes */}
        <div className="flex items-center gap-2">
          <label htmlFor="month" className="font-medium text-gray-700">
            Mes:
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="
              px-3 py-2
              border border-teal-700 rounded
              bg-white
              focus:outline-none focus:ring-2 focus:ring-teal-400
            "
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          // === ESTADO DE CARGA ===
          <div className="flex flex-col items-center py-10">
            <img
              src={buscarIcon}
              alt="Buscando…"
              className="h-20 w-20 animate-spin"
            />
            <p className="mt-4 text-gray-500">
              Buscando datos de {MONTHS[month - 1]}…
            </p>
          </div>
        ) : (
          <>
            {/* === DATOS ENCONTRADOS === */}
            <div className="flex justify-center py-6">
              <img
                src={encontradoIcon}
                alt="Datos encontrados"
                className="h-16 w-16"
              />
            </div>
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fullData.map(({ category, total }) => (
                <SummaryTile
                  key={category}
                  category={category}
                  total={total}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
