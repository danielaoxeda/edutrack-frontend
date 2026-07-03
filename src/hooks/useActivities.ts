import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import { matriculaService } from '../services/matriculaService';
import type { Actividad, SesionClase, SemanaAcademica } from '../types/activity';

function isSemanaAcademica(
    value: string | SemanaAcademica | null | undefined
): value is SemanaAcademica {
    return typeof value !== 'string' && value !== null && value !== undefined;
}

export const useActivities = (estudianteId?: number) => {
    const [activities, setActivities] = useState<Actividad[]>([]);
    const [sessions, setSessions] = useState<SesionClase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!estudianteId) {
            setActivities([]);
            setSessions([]);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [allActivities, allSessions, matriculas] = await Promise.all([
                    activityService.getAllActivities(),
                    activityService.getAllSessions(),
                    matriculaService.getMatriculasByEstudiante(estudianteId),
                ]);

                const seccionIds = matriculas
                    .map(m => m.seccion?.id)
                    .filter((id): id is number => id !== null && id !== undefined);

                const filteredActivities = allActivities.filter(act => {
                    const seccionId = act.semanaAcademica?.seccion?.id;
                    return seccionId ? seccionIds.includes(seccionId) : false;
                });

                const filteredSessions = allSessions.filter(ses => {
                    if (!isSemanaAcademica(ses.semanaAcademica)) return false;

                    const seccionId = ses.semanaAcademica.seccion?.id;
                    return seccionId ? seccionIds.includes(seccionId) : false;
                });

                setActivities(filteredActivities);
                setSessions(filteredSessions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar actividades');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [estudianteId]);

    return { activities, sessions, loading, error };
};