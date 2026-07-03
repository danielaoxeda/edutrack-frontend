import api from "../../../lib/api";

export type AuthSession = {
    token: string;
    tokenType: string;
    userId: number;
    email: string;
    name: string;
    role: string;
    roles?: string[];
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export async function login(
    credentials: LoginCredentials
): Promise<AuthSession> {
    try {
        const { data } = await api.post<AuthSession>(
            "/auth/login",
            credentials
        );

        return data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error("El correo o la contraseña son incorrectos.");
        }

        if (error.response?.status === 403) {
            throw new Error(
                "Tu cuenta está inactiva o bloqueada. Contacta al administrador."
            );
        }

        if (!error.response) {
            throw new Error(
                "No pudimos conectar con el servidor. Intenta nuevamente."
            );
        }

        throw error;
    }
}