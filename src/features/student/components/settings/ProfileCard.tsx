import { Camera } from "lucide-react";

function ProfileCard() {
    return (
        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Perfil del estudiante
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Gestiona tu información académica y personal.
                    </p>
                </div>

                <button className="text-blue-700 font-semibold hover:underline">
                    Guardar cambios
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex items-center gap-6">
                    <div className="relative">
                        <img
                            src="/user.png"
                            alt="user"
                            className="w-9 h-9 rounded-full"
                        />

                        <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                            <Camera size={16} />
                        </button>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg">
                            Adriano Bautista
                        </h3>

                        <p className="text-slate-500 text-sm">
                            Ingeniería de Software · 7mo ciclo
                        </p>

                        <p className="text-blue-700 text-sm mt-1">
                            ID Estudiante: #ST-99201
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Nombre completo
                    </label>

                    <input
                        type="text"
                        defaultValue="Adriano Bautista Calero"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Correo institucional
                    </label>

                    <input
                        type="email"
                        disabled
                        defaultValue="a.bautistacalero@edutrack.edu"
                        className="w-full rounded-xl border border-slate-200 bg-slate-100 p-3 text-slate-400"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Biografía profesional
                    </label>

                    <textarea
                        rows={5}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-blue-600"
                        defaultValue="Estudiante apasionado por el desarrollo Full Stack y arquitectura de software."
                    />
                </div>
            </div>
        </section>
    );
}

export default ProfileCard;