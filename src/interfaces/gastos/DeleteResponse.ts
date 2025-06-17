export interface DeleteResponse {
  id: number;
  date: string; // formato ISO: YYYY-MM-DD
  category: {
    id: number;
    name: string;
  };
  amount: number;
  hibernateLazyInitializer: Record<string, unknown>; // o {} si siempre es un objeto vacío
}
