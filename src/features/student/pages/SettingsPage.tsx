import StudentLayout from "../layout/StudentLayout.tsx";

import ProfileCard from "../components/settings/ProfileCard";
import SecurityCard from "../components/settings/SecurityCard";

function SettingsPage() {
    return (
        <StudentLayout>
            <div className="w-full space-y-8">
                {/* HEADER */}
                <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900">
                            Configuración
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Gestiona tu perfil, seguridad y notificaciones.
                        </p>
                    </div>

                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <ProfileCard />
                    </div>

                    <div className="lg:col-span-4">
                        <SecurityCard />
                    </div>

                </div>
            </div>
        </StudentLayout>
    );
}

export default SettingsPage;