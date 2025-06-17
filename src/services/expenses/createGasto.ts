import { GastosRequest } from "@interfaces/gastos/GastosRequest";
import Api from "@services/api";

export async function createGasto(gastoRequest: GastosRequest): Promise<void> {
    const api = await Api.getInstance();
    const response = await api.post<GastosRequest, void>(
        gastoRequest,
        { url: "/expenses" }
    );
    
    if (response.status !== 200) {
        throw new Error("Error al crear el gasto");
    }
}