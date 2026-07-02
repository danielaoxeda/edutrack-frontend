import { ApiError, request } from "../../../lib/http";
import type { AuthSession } from "../../../lib/auth";

export type LoginCredentials = {
    email: string;
    password: string;
};

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
    try {
        return await request<AuthSession>("/api/auth/login", {
            method: "POST",
            auth: false,
            body: JSON.stringify(credentials),
        });
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
            throw new Error("El correo o la contrasena son incorrectos.");
        }

        if (error instanceof ApiError && error.status === 403) {
            throw new Error("Tu cuenta esta inactiva o bloqueada. Contacta al administrador.");
        }

        throw error;
    }
}
