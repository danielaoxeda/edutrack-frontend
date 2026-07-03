import api from "../lib/api";

export const userService = {
    changePassword: async (userId: number, password: string) => {
        return await api.put(`/api/usuarios/${userId}`, {
            password,
        });
    },
};