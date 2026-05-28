import { useState } from "react";

import {
    LayoutDashboard,
    FileText,
    GraduationCap,
    Calendar,
    Settings,
    HelpCircle,
    LogOut,
    Menu,
    X,
} from "lucide-react";

const menu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        active: true,
    },
    {
        label: "Actividades",
        icon: FileText,
    },
    {
        label: "Certificaciones",
        icon: GraduationCap,
    },
    {
        label: "Calendario",
        icon: Calendar,
    },
    {
        label: "Configuración",
        icon: Settings,
    },
];

function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* BOTÓN MOBILE */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-xl shadow-lg"
            >
                <Menu size={24} />
            </button>

            {/* OVERLAY */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-screen
          bg-slate-900 text-white
          flex flex-col p-6
          transition-all duration-300

          w-64

          ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full"
                }

          lg:translate-x-0
        `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">
                        EduTrack
                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* MENÚ */}
                <nav className="space-y-2 flex-1">
                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                    item.active
                                        ? "bg-blue-700"
                                        : "hover:bg-slate-800"
                                }`}
                            >
                                <Icon size={20} />

                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* FOOTER */}
                <div className="mt-8 border-t border-slate-700 pt-6 space-y-2">
                    <button className="w-full flex items-center gap-3 text-slate-300 hover:text-white">
                        <HelpCircle size={18} />
                        <span>Ayuda</span>
                    </button>

                    <button className="w-full flex items-center gap-3 text-slate-300 hover:text-white">
                        <LogOut size={18} />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;