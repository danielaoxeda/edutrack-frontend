import {useState} from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    HelpCircle,
    LogOut,
    Menu,
    X,
    GraduationCap, type LucideIcon,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext.tsx";

interface MenuItem {
    label: string;
    icon: LucideIcon;
    path: string;
}

interface SidebarProps {
    menu: MenuItem[];
    title?: string;
}

function StudentSidebar({menu, title = "Edutrack"}: SidebarProps) {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { logout } = useAuth();

    return (
        <>
            {/* BOTÓN MOBILE */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-xl shadow-lg hover:bg-slate-800 transition"
            >
                <Menu size={24} />
            </button>

            {/* OVERLAY */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen
                    bg-[#0f172a] text-white
                    flex flex-col p-6
                    transition-all duration-300 ease-in-out
                    w-64 border-r border-slate-800
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
                            <GraduationCap className="text-blue-400" size={24} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold">{title}</h2>
                            <span className="text-xs text-slate-400">
                                Academic Management
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* MENÚ */}
                <nav className="space-y-1.5 flex-1 overflow-y-auto">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                    isActive
                                        ? "bg-blue-600 text-white font-medium"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* FOOTER */}
                <div className="mt-auto pt-6 border-t border-slate-800 space-y-3">

                    <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm">
                        <HelpCircle size={18} />
                        <span>Ayuda</span>
                    </button>

                    <button
                        onClick={() => {
                            logout();
                            navigate("/auth");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-sm"
                    >
                        <LogOut size={18} />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default StudentSidebar;