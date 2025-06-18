import { useEffect, useState } from "react";
import { CategoriaGasto } from "@interfaces/categorias/CategoriaGasto";
import { getCategorias } from "@services/categoria/getCategoria";

export function useCategorias() {
    const [categorias, setCategorias] = useState<CategoriaGasto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategorias();
    }, []);

    return { categorias, loading, error };
}