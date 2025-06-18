import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMonthlySummary } from "@services/expenses";
import { CategorySummaryDTO } from "@interfaces/Expenses";
import SummaryTile from "@components/SummaryTitle";
import { useCategorias } from "@hooks/useCategorias";

import buscarIcon from "@assets/pensive.webp"; 
import bgAnimeImg from "@assets/images/bg-anime.jpg";
import avatarImg from "@assets/images/avatar.png";

const MONTHS = [
  "Enero","Febrero","Marzo","Abril",
  "Mayo","Junio","Julio","Agosto",
  "Septiembre","Octubre","Noviembre","Diciembre",
];

export default function DashboardPage() {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const { categorias, loading: loadingCats } = useCategorias();
  const navigate = useNavigate();

  const [summary, setSummary] = useState<CategorySummaryDTO[]>([]);
  const [loadingSum, setLoadingSum] = useState(true);

  useEffect(() => {
    setLoadingSum(true);
    getMonthlySummary(month)
      .then((res) => setSummary(res))
      .catch(() => setSummary([]))
      .finally(() => setLoadingSum(false));
  }, [month]);

  const fullData = categorias.map((cat) => {
    const found = summary.find((s) => s.category === cat.name);
    return { category: cat.name, total: found?.total ?? 0, id: cat.id };
  });

  return (
    <div className="min-h-screen p-8 relative flex flex-col justify-center items-center overflow-x-hidden">
      {/* Fondo anime sutil */}
      <img src={bgAnimeImg} alt="anime bg" className="fixed inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none select-none" />
      {/* Decoración kawaii */}
      <img src={avatarImg} alt="kawaii decor" className="absolute left-0 top-0 w-32 opacity-10 pointer-events-none select-none hidden md:block" />
      <div className="space-y-6 max-w-4xl mx-auto z-10 w-full">
        <div className="flex items-center gap-2 bg-white/80 rounded-xl p-4 shadow-lg">
          <label htmlFor="month" className="font-medium text-purple-700 flex items-center gap-2">
            <span role="img" aria-label="mes">🗓️</span> Mes:
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(+e.target.value)}
            className="
              border border-purple-300 rounded px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-purple-400
              bg-white shadow-sm font-semibold text-purple-700
              hover:bg-purple-50 transition-colors
            "
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1} className="text-purple-700">
                {m}
              </option>
            ))}
          </select>
          <span className="ml-4 text-xs text-purple-400 animate-pulse">¡Elige tu mes favorito!</span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center py-10">
            <p className="mt-4 text-gray-500">
              Cargando datos de {MONTHS[month - 1]}…
            </p>
            <img
              src={buscarIcon}
              alt="Cargando…"
              className="w-[300px] h-[300px]"
            />
          </div>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {fullData.map(({ category, total, id }) => (
              <SummaryTile
                key={category}
                category={category}
                total={total}
                onClick={() => navigate(`/expenses/details?month=${month}&categoryId=${id}`)}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
