export interface RawSummary {
  id: number;
  expenseCategory: { id: number; name: string };
  year: number;
  month: number;
  amount: number;
}   

export interface CategorySummaryDTO {
  category: string; 
  total: number;   
}