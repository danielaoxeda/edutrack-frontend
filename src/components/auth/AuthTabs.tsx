import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabs = () => {
    const [tab, setTab] = useState<"login" | "register">(
        "login"
    );

    return (
        <div className="bg-white border rounded shadow-sm overflow-hidden">
            <div className="flex border-b">
                <button
                    onClick={() => setTab("login")}
                    className={`flex-1 py-4 font-semibold transition-all ${
                        tab === "login"
                            ? "text-blue-900 border-b-2 border-blue-900 bg-blue-50"
                            : "text-gray-500"
                    }`}
                >
                    Iniciar sesión
                </button>

                <button
                    onClick={() => setTab("register")}
                    className={`flex-1 py-4 font-semibold transition-all ${
                        tab === "register"
                            ? "text-blue-900 border-b-2 border-blue-900 bg-blue-50"
                            : "text-gray-500"
                    }`}
                >
                    Registrarse
                </button>
            </div>

            <div className="p-8">
                {tab === "login" ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}
            </div>
        </div>
    );
};

export default AuthTabs;