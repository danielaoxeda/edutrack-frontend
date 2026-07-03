import api from '../lib/api';
import type { Actividad, SesionClase } from '../types/activity';

export const activityService = {
    // Obtiene todas las actividades (sin filtros por ahora)
    getAllActivities: async (): Promise<Actividad[]> => {
        const response = await api.get('/actividades');
        return response.data;
    },

    // Obtiene todas las sesiones
    getAllSessions: async (): Promise<SesionClase[]> => {
        const response = await api.get('/sesiones');
        return response.data;
    },

};