import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-2">
                    Bienvenido de nuevo
                </h2>

                <p className="text-gray-500">
                    Accede a tu panel institucional.
                </p>
            </div>

            <form
                className="space-y-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    navigate("/dashboard-estudiante");
                }}
            >
                <Input
                    label="Correo institucional"
                    type="email"
                    placeholder="nombre@universidad.edu"
                />

                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                />

                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:opacity-90" type="submit">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default LoginForm;