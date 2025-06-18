import { CategoriaGasto } from "@interfaces/categorias/CategoriaGasto";
import Api from "@services/api";

export async function getCategorias(): Promise<CategoriaGasto[]> {
    const api = await Api.getInstance();
    const response = await api.get<void, CategoriaGasto[]>({
        url: "/expenses_category",
    });
    return response.data;
}