import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect
} from 'react';
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
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [estudianteId, setEstudianteId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedTokenType = localStorage.getItem("tokenType");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            const parsedUser: User = JSON.parse(storedUser);

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToken(storedToken);
            setUser(parsedUser);

            api.defaults.headers.common.Authorization =
                `${storedTokenType ?? "Bearer"} ${storedToken}`;

            console.log("🔐 AUTH USER (init):", parsedUser);
            console.log("🔐 USER ID (init):", parsedUser.id);
        }

        setIsLoading(false);
    }, []);

    // 🔥 ESTE ES EL FIX CLAVE
    useEffect(() => {
        const fetchEstudianteId = async () => {
            if (!user) return;

            try {
                const res = await api.get("/estudiantes");

                const estudiante = res.data.find(
                    (e: any) => e.usuario.id === user.id
                );

                setEstudianteId(estudiante?.id ?? null);

                console.log("🎓 ESTUDIANTE ID RESUELTO:", estudiante?.id);
            } catch (err) {
                console.error("Error obteniendo estudianteId:", err);
            }
        };

        fetchEstudianteId();
    }, [user]);

    const login = async (email: string, password: string): Promise<User> => {
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

        localStorage.setItem("token", token);
        localStorage.setItem("tokenType", tokenType);
        localStorage.setItem("user", JSON.stringify(loggedUser));

        setToken(token);
        setUser(loggedUser);

        api.defaults.headers.common.Authorization = `${tokenType} ${token}`;

        console.log("🔐 LOGIN USER:", loggedUser);

        return loggedUser;
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setToken(null);
        setEstudianteId(null);
        delete api.defaults.headers.common.Authorization;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                estudianteId,
                login,
                logout,
                isLoading
            }}
        >
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