import { useEffect, useState } from "react";
import {
    loadStudentWorkspace,
    type StudentWorkspace,
} from "../api/studentWorkspaceApi";

export function useStudentWorkspace() {
    const [workspace, setWorkspace] = useState<StudentWorkspace | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function load() {
            try {
                setLoading(true);
                setError(null);
                const data = await loadStudentWorkspace();

                if (isMounted) {
                    setWorkspace(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "No se pudo cargar el panel del alumno");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            isMounted = false;
        };
    }, []);

    return { workspace, loading, error };
}
