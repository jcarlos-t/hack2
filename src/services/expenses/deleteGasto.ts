import { DeleteResponse } from "@interfaces/gastos/DeleteResponse";
import Api from "@services/api";

export async function deleteGasto(id: number): Promise<DeleteResponse> {
    const api = await Api.getInstance();
    const response = await api.delete<DeleteResponse>(
        { url: `/expenses/${id}` }
    );
    
    if (response.status !== 200) {
        throw new Error("Error al eliminar el gasto");
    }
    
    return response.data;
}