import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
    HelpCircle,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export interface MenuItem {
    label: string;
    icon: LucideIcon;
    path: string;
}

interface SidebarProps {
    menu: MenuItem[];
    title?: string;
}

function Sidebar({
                     menu,
                     title = "EduTrack",
                 }: SidebarProps) {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

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
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">
                        {title}
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
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                    isActive
                                        ? "bg-blue-700 text-white font-medium"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* FOOTER */}
                <div className="mt-8 border-t border-slate-700 pt-6 space-y-2">
                    <button className="w-full flex items-center gap-3 text-slate-300 hover:text-white transition">
                        <HelpCircle size={18} />
                        <span>Ayuda</span>
                    </button>

                    <button className="w-full flex items-center gap-3 text-slate-300 hover:text-white transition">
                        <LogOut size={18} />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;