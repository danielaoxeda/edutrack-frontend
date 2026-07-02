import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, ChevronDown, GraduationCap, User, ShieldCheck } from "lucide-react";
import { getAuthSession } from "../../../../lib/auth";

function TeacherHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const session = getAuthSession();
    const teacherName = session?.name?.trim() || "Profesor";
    const firstName = teacherName.split(/\s+/)[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const roles = [
        { name: "Estudiante", path: "/dashboard-estudiante", icon: GraduationCap },
        { name: "Docente", path: "/dashboard-docente", icon: User },
        { name: "Administrador", path: "/dashboard-admin", icon: ShieldCheck }
    ];

    return (
        <header className="bg-[#f8fafc] border-b border-slate-200 px-6 py-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                {/* WELCOME TEXT */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                        Bienvenido, {firstName}
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                        Resumen académico para el ciclo actual.
                    </p>
                </div>

                {/* HEADER ACTIONS */}
                <div className="flex items-center gap-3 md:gap-4 justify-end shrink-0">
                    
                    {/* SEARCH INPUT */}
                    <div className="relative flex items-center bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm w-full max-w-[260px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200">
                        <Search size={16} className="text-slate-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Buscar estudiantes, cursos..."
                            className="bg-transparent outline-none ml-2 text-sm text-slate-700 placeholder-slate-400 w-full"
                        />
                    </div>

                    {/* NOTIFICATIONS */}
                    <button className="relative w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm text-slate-600 transition duration-200">
                        <Bell size={18} />
                        {/* Red Dot active badge */}
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                    </button>

                    {/* PROFILE CARD WITH ROLE SWITCHER */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-3 bg-white pl-3 pr-4 py-1.5 rounded-full border border-slate-200 shadow-sm shrink-0 min-w-[150px] cursor-pointer hover:bg-slate-50 transition-colors text-left"
                        >
                            <div className="relative shrink-0">
                                <img
                                    src="/user.png"
                                    alt={`Avatar de ${teacherName}`}
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/10"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
                                    }}
                                />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                            </div>

                            <div className="flex flex-col leading-tight shrink-0 whitespace-nowrap">
                                <span className="font-bold text-sm text-slate-900">
                                    {teacherName}
                                </span>
                                <span className="text-[11px] font-medium text-slate-500">
                                    {session?.email || "Docente"}
                                </span>
                            </div>
                            <ChevronDown size={14} className={`text-slate-500 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-3 py-2 mb-2 border-b border-slate-100">
                                    <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Cambiar vista / rol</span>
                                </div>
                                <div className="space-y-1">
                                    {roles.map((role) => {
                                        const Icon = role.icon;
                                        const isCurrent = role.name === "Docente";
                                        return (
                                            <button
                                                key={role.name}
                                                onClick={() => {
                                                    navigate(role.path);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                                    isCurrent
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <span className={`p-1.5 rounded-lg ${isCurrent ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                                                        <Icon size={16} />
                                                    </span>
                                                    <span>{role.name}</span>
                                                </div>
                                                {isCurrent && (
                                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                                                        Activo
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </header>
    );
}

export default TeacherHeader;
