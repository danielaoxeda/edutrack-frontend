import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
    HelpCircle,
    LogOut,
    Menu,
    X,
    Plus,
    GraduationCap,
} from "lucide-react";
import { teacherMenu } from "../../navigation/teacherMenu";

function TeacherSidebar() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <>
            {/* BOTÓN MOBILE */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-xl shadow-lg hover:bg-slate-800 transition-all duration-200"
            >
                <Menu size={24} />
            </button>

            {/* OVERLAY */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
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
                            <h2 className="text-lg font-bold tracking-tight text-white leading-tight">
                                EduTrack Pro
                            </h2>
                            <span className="text-xs text-slate-400 font-medium block">
                                Academic Management
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* MENÚ */}
                <nav className="space-y-1.5 flex-1 overflow-y-auto pr-1">
                    {teacherMenu.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path || (item.path === "/dashboard-docente" && pathname === "/dashboard-docente");

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                    isActive
                                        ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/20"
                                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                                }`}
                            >
                                <Icon size={18} className={`transition-colors duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-100"}`} />
                                <span className="text-[14px]">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ACCIONES DEL BOTTOM */}
                <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
                    {/* Botón "+ New Report" */}
                    <button className="w-full bg-[#1e293b] hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-100 hover:text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm text-sm group">
                        <Plus size={16} className="text-blue-400 group-hover:text-white transition-colors duration-200" />
                        <span>New Report</span>
                    </button>

                    <div className="space-y-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition text-sm">
                            <HelpCircle size={18} className="text-slate-500" />
                            <span>Help Center</span>
                        </button>

                        <Link to="/" className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm">
                            <LogOut size={18} className="text-slate-500 group-hover:text-red-400" />
                            <span>Cerrar sesión</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default TeacherSidebar;
