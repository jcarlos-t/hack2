export interface GastosRequest {
  category: {
    id: number;
    name: string;
  };
  year: number;
  month: number;
  amount: number;
}
