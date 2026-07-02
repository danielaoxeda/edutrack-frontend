// hooks/useActivities.ts
import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import { matriculaService } from '../services/matriculaService';
import type { Actividad, SesionClase } from '../types/activity';

export const useActivities = (estudianteId?: number) => {
    const [activities, setActivities] = useState<Actividad[]>([]);
    const [sessions, setSessions] = useState<SesionClase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // 1. Obtener todas las actividades y sesiones en paralelo
                const [allActivities, allSessions] = await Promise.all([
                    activityService.getAllActivities(),
                    activityService.getAllSessions(),
                ]);

                let filteredActivities = allActivities;
                let filteredSessions = allSessions;

                // 2. Si tenemos estudianteId, filtramos por sus secciones
                if (estudianteId) {
                    // Obtener las matrículas del estudiante
                    const matriculas = await matriculaService.getMatriculasByEstudiante(estudianteId);
                    const seccionIds = matriculas.map(m => m.seccion.id);

                    // Filtrar actividades: solo las que pertenecen a una sección del estudiante
                    filteredActivities = allActivities.filter(act =>
                        seccionIds.includes(act.semanaAcademica?.seccion?.id)
                    );

                    // Filtrar sesiones: solo las que pertenecen a una sección del estudiante
                    // Nota: SesionClase tiene semanaAcademica, que a su vez tiene seccion
                    filteredSessions = allSessions.filter(ses =>
                        ses.semanaAcademica && typeof ses.semanaAcademica !== 'string'
                            ? seccionIds.includes(ses.semanaAcademica.seccion?.id)
                            : false
                    );
                }

                setActivities(filteredActivities);
                setSessions(filteredSessions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar actividades');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [estudianteId]); // Se re-ejecuta si cambia el estudianteId

    return { activities, sessions, loading, error };
};