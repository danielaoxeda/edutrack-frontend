import { useState } from "react";
import { userService } from "../services/userService";

export const useUserSecurity = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const changePassword = async (userId: number, password: string) => {
        try {
            setLoading(true);
            setError(null);

            return await userService.changePassword(userId, password);
        } catch (err) {
            setError("Error al cambiar contraseña");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error };
};