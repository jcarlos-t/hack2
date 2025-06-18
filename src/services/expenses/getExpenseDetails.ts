import Api from "@services/api";

export interface ExpenseDetail {
  id: number;
  date: string;
  category: {
    id: number;
    name: string;
  };
  amount: number;
}

export interface ExpensesByYear {
  year: number;
  expenses: ExpenseDetail[];
  total: number;
}

export const getExpenseDetails = async (
  month: number,
  categoryId: number
): Promise<ExpensesByYear[]> => {
  const api = await Api.getInstance();

  // Obtener gastos de los últimos 5 años
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
  
  const expensesByYear: ExpensesByYear[] = [];
  
  for (const year of years) {
    try {
      const { data } = await api.get<void, ExpenseDetail[]>({
        url: `/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
      });
      
      if (data && data.length > 0) {
        const total = data.reduce((sum, expense) => sum + expense.amount, 0);
        expensesByYear.push({
          year,
          expenses: data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          total
        });
      }
    } catch (error) {
      // Si no hay datos para este año, continuar con el siguiente
      console.log(`No hay datos para ${year}`);
    }
  }

  // Ordenar por año (más reciente primero)
  return expensesByYear.sort((a, b) => b.year - a.year);
}; 