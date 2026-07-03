import { useState } from "react";
import { ChevronRight, ShieldCheck, Lock } from "lucide-react";
import {useAuth} from "../../../../context/AuthContext.tsx";
import {useUserSecurity} from "../../../../hooks/useUserSecurity.ts";


function SecurityCard() {
    const { user } = useAuth();
    const { changePassword, loading } = useUserSecurity();

    const [showForm, setShowForm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async () => {
        if (!user) return;

        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (newPassword.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            await changePassword(user.id, newPassword);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowForm(false);

            alert("Contraseña actualizada correctamente");
        } catch (err) {
            alert("Error al cambiar contraseña");
        }
    };

    return (
        <section className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

            <div className="relative z-10">
                <h2 className="text-2xl font-bold">Seguridad</h2>

                <p className="text-slate-400 mt-2 mb-8">
                    Protege tu acceso académico.
                </p>

                {/* BOTÓN PRINCIPAL */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/15 transition"
                >
                    <div className="flex items-center gap-3">
                        <Lock className="text-blue-400" size={20} />

                        <div className="text-left">
                            <p className="font-semibold">
                                Cambiar contraseña
                            </p>
                            <p className="text-sm text-slate-400">
                                Actualiza tu clave de acceso
                            </p>
                        </div>
                    </div>

                    <ChevronRight size={18} />
                </button>

                {/* FORM */}
                {showForm && (
                    <div className="mt-5 bg-white/10 p-4 rounded-2xl space-y-3">

                        {/* CONTRASEÑA ACTUAL */}
                        <input
                            type="password"
                            placeholder="Contraseña actual"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.target.value)
                            }
                            className="w-full p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* NUEVA CONTRASEÑA */}
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            className="w-full p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* CONFIRMAR */}
                        <input
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="w-full p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* BOTÓN */}
                        <button
                            onClick={handleChangePassword}
                            disabled={loading}
                            className="bg-blue-600 px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
                        >
                            {loading
                                ? "Guardando..."
                                : "Actualizar contraseña"}
                        </button>
                    </div>
                )}

                {/* 2FA SOLO UI */}
                <div className="mt-6 bg-white/10 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck
                                className="text-blue-400"
                                size={20}
                            />
                            <p className="font-semibold">
                                Autenticación 2FA
                            </p>
                        </div>

                        <input type="checkbox" defaultChecked />
                    </div>

                    <p className="text-sm text-slate-400">
                        Protege tu cuenta usando autenticación en dos pasos.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SecurityCard;