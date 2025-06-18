import { useEffect, useState, useCallback } from "react";
import { CategoriaGasto } from "@interfaces/categorias/CategoriaGasto";
import { getCategorias } from "@services/categoria/getCategoria";

export function useCategorias() {
    const [categorias, setCategorias] = useState<CategoriaGasto[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchCategorias = useCallback(async (isRefreshing = false) => {
        try {
            if (isRefreshing) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            const data = await getCategorias();
            setCategorias(data);
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchCategorias();
    }, [fetchCategorias]);

    return { 
        categorias, 
        loading, 
        refreshing,
        error, 
        refresh: () => fetchCategorias(true) 
    };
}