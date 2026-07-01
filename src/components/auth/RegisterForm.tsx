import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-semibold mb-2">
                    Crear cuenta
                </h2>

                <p className="text-gray-500">
                    Únete a la comunidad académica de EduTrack.
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
                    label="Nombre completo"
                    type="text"
                    placeholder="Dra. Ana Pérez"
                />

                <Input
                    label="Correo electrónico"
                    type="email"
                    placeholder="ana@edu.com"
                />

                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                />

                <Input
                    label="Confirmar contraseña"
                    type="password"
                    placeholder="••••••••"
                />

                <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:opacity-90" type="submit">
                    Crear cuenta
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;