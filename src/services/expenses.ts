
import Api from "./api";
import { RawSummary, CategorySummaryDTO } from "@interfaces/Expenses";

export const getMonthlySummary = async (
  month: number  
): Promise<CategorySummaryDTO[]> => {
  const api = await Api.getInstance();

  const { data } = await api.get<void, RawSummary[]>({
    url: "/expenses_summary",
  });

  const onlyThisMonth = data.filter((r) => r.month === month);

  const grouped = onlyThisMonth.reduce<Record<string, number>>((acc, r) => {
    const cat = r.expenseCategory.name;
    acc[cat] = (acc[cat] || 0) + r.amount;
    return acc;
  }, {});

  return Object.entries(grouped).map(([category, total]) => ({ category, total }));
};