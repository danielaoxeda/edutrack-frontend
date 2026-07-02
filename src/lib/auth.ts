export type AuthSession = {
    token: string;
    tokenType: string;
    userId: number;
    email: string;
    name: string;
    role: string;
    roles?: string[];
};

const STORAGE_KEY = "edutrack.auth";

function isBrowser() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getAuthSession(): AuthSession | null {
    if (!isBrowser()) {
        return null;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as AuthSession;
    } catch {
        window.localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

export function setAuthSession(session: AuthSession) {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
}

export function getAuthToken(): string | null {
    return getAuthSession()?.token ?? null;
}

export function getAuthRole(): string | null {
    return getAuthSession()?.role ?? null;
}
