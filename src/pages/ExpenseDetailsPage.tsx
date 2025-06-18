import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getExpenseDetails, ExpensesByYear as ExpensesByYearType } from "@services/expenses/getExpenseDetails";
import { useCategorias } from "@hooks/useCategorias";
import ExpensesByYear from "@components/ExpensesByYear";
import bgDetailsImg from "@assets/images/bg-details.jpg";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function ExpenseDetailsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { categorias } = useCategorias();

  const month = parseInt(searchParams.get("month") || "1");
  const categoryId = parseInt(searchParams.get("categoryId") || "0");

  const [expensesByYear, setExpensesByYear] = useState<ExpensesByYearType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCategory = categorias.find(cat => cat.id === categoryId);

  useEffect(() => {
    if (categoryId && month) {
      setLoading(true);
      setError(null);
      
      getExpenseDetails(month, categoryId)
        .then((data) => {
          setExpensesByYear(data);
        })
        .catch((err) => {
          console.error("Error fetching expense details:", err);
          setError("Error al cargar los detalles de gastos");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [month, categoryId]);

  const handleDelete = (expenseId: number) => {
    setExpensesByYear(prev => 
      prev.map(yearData => ({
        ...yearData,
        expenses: yearData.expenses.filter((exp: any) => exp.id !== expenseId),
        total: yearData.expenses
          .filter((exp: any) => exp.id !== expenseId)
          .reduce((sum: number, exp: any) => sum + exp.amount, 0)
      })).filter(yearData => yearData.expenses.length > 0)
    );
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  const totalAllYears = expensesByYear.reduce((sum, yearData) => sum + yearData.total, 0);

  return (
    <div className="min-h-screen p-8 relative flex flex-col justify-center items-center overflow-x-hidden">
      {/* Fondo anime sutil */}
      <img src={bgDetailsImg} alt="anime bg" className="fixed inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none select-none" />
      
      <div className="space-y-6 max-w-4xl mx-auto z-10 w-full">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                title="Volver"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-purple-800">
                  Detalles de Gastos
                </h1>
                <p className="text-purple-600">
                  {selectedCategory?.name} • {MONTHS[month - 1]}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-600">Total General</p>
              <p className="text-2xl font-bold text-purple-800">
                {formatAmount(totalAllYears)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-purple-600">
            <span className="flex items-center gap-1">
              <span role="img" aria-label="info">ℹ️</span>
              Haz clic en cada año para ver los gastos específicos
            </span>
          </div>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="py-10 text-center text-purple-400 flex flex-col items-center">
            <svg className="w-16 h-16 animate-bounce mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-lg">Cargando detalles de gastos…</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : expensesByYear.length === 0 ? (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
            <span className="text-4xl mb-4 block">🎉</span>
            <h3 className="text-xl font-bold text-purple-800 mb-2">
              ¡No hay gastos registrados!
            </h3>
            <p className="text-purple-600 mb-4">
              No se encontraron gastos para {selectedCategory?.name} en {MONTHS[month - 1]}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Volver al Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {expensesByYear.map((yearData) => (
              <ExpensesByYear
                key={yearData.year}
                yearData={yearData}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 