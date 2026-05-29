import {
    ChevronRight,
    ShieldCheck,
    Lock,
} from "lucide-react";

function SecurityCard() {
    return (
        <section className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

            <div className="relative z-10">
                <h2 className="text-2xl font-bold">
                    Seguridad
                </h2>

                <p className="text-slate-400 mt-2 mb-8">
                    Protege tu acceso académico.
                </p>

                <div className="space-y-5">
                    <button className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/15 transition">
                        <div className="flex items-center gap-3">
                            <Lock className="text-blue-400" size={20} />

                            <div className="text-left">
                                <p className="font-semibold">
                                    Cambiar contraseña
                                </p>

                                <p className="text-sm text-slate-400">
                                    Último cambio hace 3 meses
                                </p>
                            </div>
                        </div>

                        <ChevronRight size={18} />
                    </button>

                    <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
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

                            <input
                                type="checkbox"
                                defaultChecked
                                className="w-5 h-5"
                            />
                        </div>

                        <p className="text-sm text-slate-400">
                            Protege tu cuenta usando autenticación
                            en dos pasos.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SecurityCard;