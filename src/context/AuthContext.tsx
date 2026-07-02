import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import api from '../lib/api';

interface User {
    id: number;
    nombre: string;
    rol: string;
    email?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    estudianteId: number | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedTokenType = localStorage.getItem("tokenType");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToken(storedToken);
            setUser(JSON.parse(storedUser));

            api.defaults.headers.common.Authorization =
                `${storedTokenType ?? "Bearer"} ${storedToken}`;
        }

        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const response = await api.post("/auth/login", { email, password });

        const {
            token,
            tokenType,
            userId,
            name,
            role,
            email: userEmail,
        } = response.data;

        const loggedUser: User = {
            id: userId,
            nombre: name,
            rol: role,
            email: userEmail,
        };

        // Guardar en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("tokenType", tokenType);
        localStorage.setItem("user", JSON.stringify(loggedUser));

        // Actualizar estado
        setToken(token);
        setUser(loggedUser);

        api.defaults.headers.common.Authorization = `${tokenType} ${token}`;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenType");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

        delete api.defaults.headers.common.Authorization;
    };

    const estudianteId = user?.rol === 'ESTUDIANTE' ? user.id : null;

    return (
        <AuthContext.Provider value={{ user, token, estudianteId, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};