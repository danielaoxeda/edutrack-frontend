import { clearAuthSession, getAuthToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type RequestOptions = RequestInit & {
    auth?: boolean;
};

export class ApiError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

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

    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers,
        });
    } catch {
        throw new ApiError("No pudimos conectar con el servidor. Intenta nuevamente en unos momentos.", 0);
    }

    if (!response.ok) {
        let errorMessage = "No pudimos completar la solicitud. Intenta nuevamente.";

        try {
            const errorBody = await response.clone().json();
            const backendMessage = errorBody?.message ?? errorBody?.mensaje;
            if (typeof backendMessage === "string" && backendMessage.trim()) {
                errorMessage = backendMessage;
            }
        } catch {
            try {
                const errorText = await response.clone().text();
                if (errorText.trim()) {
                    errorMessage = errorText;
                }
            } catch {
                // Keep the user-friendly fallback.
            }
        }

        if (response.status === 401 && options.auth !== false) {
            clearAuthSession();
            if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
                window.location.assign("/auth");
            }
            throw new ApiError("Tu sesion expiro. Vuelve a iniciar sesion.", response.status);
        }

        throw new ApiError(errorMessage, response.status);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}
