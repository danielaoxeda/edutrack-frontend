// src/services/activityService.ts
import api from '../lib/api';
import type { Activity, ActivityFilters } from '../types/activity';
// Importar mock temporal (luego lo moveremos a un archivo de mock)
import { mockActivities } from '../data/mock/activitiesMock';

// Flag para usar mock (cambiar a false cuando el backend esté listo)
const USE_MOCK = true;

export const activityService = {
    // Obtener todas las actividades con filtros
    getActivities: async (filters?: ActivityFilters): Promise<Activity[]> => {
        if (USE_MOCK) {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 500));
            // Filtrar por fechas si se proporcionan (mock simple)
            let filtered = [...mockActivities];
            if (filters?.fechaInicio && filters?.fechaFin) {
                // Simular filtro por rango de fechas (mock simple)
                // En la realidad el backend haría esto
            }
            return filtered;
        }

        // Llamada real a la API
        const params = new URLSearchParams();
        if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio);
        if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin);
        if (filters?.seccionId) params.append('seccionId', String(filters.seccionId));
        // ... otros filtros

        const response = await api.get(`/actividades?${params.toString()}`);
        return response.data; // Asumiendo que la API devuelve un array de actividades
    },

    // Obtener una actividad por ID (opcional)
    getActivityById: async (id: number): Promise<Activity> => {
        const response = await api.get(`/actividades/${id}`);
        return response.data;
    },
};