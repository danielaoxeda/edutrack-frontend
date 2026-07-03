import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import { useAuth } from "../../context/AuthContext";
import {resolveDashboard} from "../../lib/routes.ts";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const loggedUser = await login(email, password);
            navigate(resolveDashboard(loggedUser.rol));
        } catch (loginError) {
            setError(loginError instanceof Error ? loginError.message : "No se pudo iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-2 text-slate-800">
                    Bienvenido de nuevo
                </h2>

                <p className="text-gray-500">
                    Accede a tu panel institucional.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </div>
                )}

                <Input
                    label="Correo institucional"
                    type="email"
                    placeholder="nombre@universidad.edu (ej. docente@universidad.edu o admin@universidad.edu)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1e3a8a] text-white py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium shadow-sm"
                >
                    {loading ? "Ingresando..." : "Iniciar sesión"}
                </button>

                <p className="text-center text-xs text-slate-400 mt-4 leading-normal">
                    Tip: Usa un correo con <span className="font-semibold text-blue-700">"docente"</span> o <span className="font-semibold text-blue-700">"teacher"</span> para entrar como Profesor, o <span className="font-semibold text-blue-700">"admin"</span> para Administrador.
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
