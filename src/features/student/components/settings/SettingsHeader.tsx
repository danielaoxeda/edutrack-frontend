import { Search, Bell } from "lucide-react";

function SettingsHeader() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
                <h1 className="text-4xl font-extrabold text-slate-900">
                    Configuración
                </h1>

                <p className="text-slate-500 mt-2">
                    Gestiona tu perfil, seguridad y notificaciones.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-3 text-slate-400"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Buscar ajustes..."
                        className="w-72 pl-10 pr-4 py-3 rounded-full border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <button className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                    <Bell size={20} />
                </button>


            </div>
        </div>
    );
}

export default SettingsHeader;