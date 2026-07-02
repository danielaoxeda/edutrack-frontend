import { clearAuthSession, getAuthToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type RequestOptions = RequestInit & {
    auth?: boolean;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers = new Headers(options.headers ?? {});

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (options.auth !== false) {
        const token = getAuthToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorMessage = `No se pudo cargar ${path} (${response.status})`;

        try {
            const errorBody = await response.clone().json();
            if (typeof errorBody?.message === "string" && errorBody.message.trim()) {
                errorMessage = errorBody.message;
            }
        } catch {
            try {
                const errorText = await response.clone().text();
                if (errorText.trim()) {
                    errorMessage = errorText;
                }
            } catch {
                // Keep fallback message.
            }
        }

        if (response.status === 401 && options.auth !== false) {
            clearAuthSession();
            if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
                window.location.assign("/auth");
            }
            throw new Error("Tu sesión expiró. Vuelve a iniciar sesión.");
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}
