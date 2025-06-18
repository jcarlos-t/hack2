import { useState } from "react";
import { ExpensesByYear as ExpensesByYearType } from "@services/expenses/getExpenseDetails";
import { deleteGasto } from "@services/expenses/deleteGasto";

const kawaiiIcons: Record<string, string> = {
  // Gastos básicos
  "Comida": "🍙",
  "Transporte": "🚌",
  "Vivienda": "🏠",
  "Servicios": "⚡",
  
  // Entretenimiento y ocio
  "Entretenimiento": "🎮",
  "Cine": "🎬",
  "Música": "🎵",
  "Deportes": "⚽",
  "Viajes": "✈️",
  
  // Salud y bienestar
  "Salud": "💊",
  "Medicinas": "💊",
  "Gimnasio": "💪",
  "Belleza": "💄",
  
  // Educación y desarrollo
  "Educación": "📚",
  "Cursos": "🎓",
  "Libros": "📖",
  "Tecnología": "💻",
  
  // Compras y consumo
  "Compras": "🛍️",
  "Ropa": "👕",
  "Zapatos": "👟",
  "Accesorios": "👜",
  "Electrónicos": "📱",
  
  // Servicios personales
  "Peluquería": "✂️",
  "Spa": "🧖‍♀️",
  "Masajes": "💆‍♀️",
  
  // Gastos del hogar
  "Limpieza": "🧹",
  "Jardín": "🌱",
  "Mascotas": "🐕",
  
  // Financieros
  "Préstamos": "💰",
  "Seguros": "🛡️",
  "Inversiones": "📈",
  
  // Otros
  "Otros": "🎀",
  "Regalos": "🎁",
  "Donaciones": "🤝",
  "Emergencias": "🚨",
};

interface ExpensesByYearProps {
  yearData: ExpensesByYearType;
  onDelete: (expenseId: number) => void;
}

export default function ExpensesByYear({ yearData, onDelete }: ExpensesByYearProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (expenseId: number) => {
    setDeletingId(expenseId);
    try {
      await deleteGasto(expenseId);
      onDelete(expenseId);
    } catch (error) {
      console.error("Error al eliminar gasto:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200 overflow-hidden">
      {/* Header del año */}
      <div 
        className="p-4 cursor-pointer hover:bg-purple-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗓️</span>
            <div>
              <h3 className="text-lg font-bold text-purple-800">
                Año {yearData.year}
              </h3>
              <p className="text-sm text-purple-600">
                {yearData.expenses.length} gasto{yearData.expenses.length !== 1 ? 's' : ''} • Total: {formatAmount(yearData.total)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-medium">
              {formatAmount(yearData.total)}
            </span>
            <svg 
              className={`w-5 h-5 text-purple-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Lista de gastos (expandible) */}
      {isExpanded && (
        <div className="border-t border-purple-200 bg-purple-50/50">
          <div className="p-4 space-y-3">
            {yearData.expenses.map((expense) => {
              const icon = kawaiiIcons[expense.category.name] || "🎀";
              return (
                <div 
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-lg">
                      {icon}
                    </div>
                    <div>
                      <p className="font-medium text-purple-800">
                        {expense.category.name}
                      </p>
                      <p className="text-sm text-purple-600">
                        {formatDate(expense.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-purple-800">
                      {formatAmount(expense.amount)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(expense.id);
                      }}
                      disabled={deletingId === expense.id}
                      className="
                        p-2 text-red-500 hover:bg-red-50 rounded-lg
                        transition-colors disabled:opacity-50
                        hover:text-red-600
                      "
                      title="Eliminar gasto"
                    >
                      {deletingId === expense.id ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 