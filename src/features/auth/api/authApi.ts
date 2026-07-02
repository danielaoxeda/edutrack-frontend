import { request } from "../../../lib/http";
import type { AuthSession } from "../../../lib/auth";

export type LoginCredentials = {
    email: string;
    password: string;
};

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
    return request<AuthSession>("/api/auth/login", {
        method: "POST",
        auth: false,
        body: JSON.stringify(credentials),
    });
}
