import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const emailLower = email.toLowerCase();
        if (emailLower.includes("teacher") || emailLower.includes("docente")) {
            navigate("/dashboard-docente");
        } else {
            navigate("/dashboard-estudiante");
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-2 text-slate-800">
                    Welcome Back
                </h2>

                <p className="text-gray-500">
                    Access your institutional dashboard.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Institutional Email"
                    type="email"
                    placeholder="teacher@university.edu o student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-[#1e3a8a] text-white py-3 rounded-lg hover:bg-blue-900 transition-colors font-medium shadow-sm"
                >
                    Login
                </button>

                <p className="text-center text-xs text-slate-400 mt-4">
                    Tip: Usa un correo con <span className="font-semibold text-blue-700">"teacher"</span> o <span className="font-semibold text-blue-700">"docente"</span> para entrar como Profesor.
                </p>
            </form>
        </div>
    );
};

export default LoginForm;