import { useCallback, useEffect, useState } from "react";
import { loadAdminOverview, type AdminOverview } from "../api/adminApi";

export function useAdminOverview() {
    const [overview, setOverview] = useState<AdminOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setLoading(true);

        try {
            const data = await loadAdminOverview();
            setOverview(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo cargar el modulo administrador");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    return {
        overview,
        loading,
        error,
        refresh,
    };
}
