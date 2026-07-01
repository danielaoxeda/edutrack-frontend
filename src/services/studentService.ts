import api from "../lib/api.ts";

export const studentService = {

    getStudentById: async (id: number) => {
        const response = await api.get(`/estudiantes/${id}`);
        return response.data;
    },

    getNotifications: async (userId: number) => {
        const response = await api.get(
            `/notificaciones/usuario/${userId}`
        );
        return response.data;
    },

    getUnreadNotifications: async (userId: number) => {
        const response = await api.get(
            `/notificaciones/usuario/${userId}/no-leidas`
        );
        return response.data;
    },
};