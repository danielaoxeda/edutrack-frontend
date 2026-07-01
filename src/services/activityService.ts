import api from '../lib/api';
import type { Actividad, SesionClase } from '../types/activity';

export const activityService = {
    // Obtener todas las actividades (sin filtros en backend)
    getAllActivities: async (): Promise<Actividad[]> => {
        const response = await api.get('/actividades');
        return response.data;
    },

    // Obtener todas las sesiones
    getAllSessions: async (): Promise<SesionClase[]> => {
        const response = await api.get('/sesiones');
        return response.data;
    },
};