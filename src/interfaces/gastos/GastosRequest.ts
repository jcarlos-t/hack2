export interface GastosRequest {
  id: number;
  category: {
    id: number;
    name: string;
  };
  year: number;
  month: number;
  amount: number;
}
