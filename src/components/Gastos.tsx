import { useEffect, useState } from "react";
import { getMonthlySummary } from "@services/expenses";
import { CategorySummaryDTO } from "@interfaces/Expenses";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function Gastos() {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [summary, setSummary] = useState<CategorySummaryDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getMonthlySummary(month)
      .then((data) => setSummary(data))
      .catch(() => setSummary([]))
      .finally(() => setLoading(false));
  }, [month]);

  if (loading) return <p>Cargando datos…</p>;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="mes" className="font-medium mr-2">Mes:</label>
        <select
          id="mes"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="
            px-3 py-1 border border-gray-300 rounded
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        >
          {MONTHS.map((m, i) => (
            <option key={i} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <ul className="list-disc pl-5">
        {summary.map(({ category, total }) => (
          <li key={category} className="py-1">
            <strong>{category}</strong>: S/. {total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}