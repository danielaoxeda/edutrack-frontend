import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    Search,
    ChevronDown,
    GraduationCap,
    User,
    ShieldCheck,
} from "lucide-react";
import {useAuth} from "../../../context/AuthContext.tsx";


function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { user } = useAuth();

    const studentName = user?.nombre?.trim() || "Estudiante";
    const firstName = studentName.split(/\s+/)[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const roles = [
        { name: "Estudiante", path: "/dashboard-estudiante", icon: GraduationCap },
        { name: "Docente", path: "/dashboard-docente", icon: User },
        { name: "Administrador", path: "/dashboard-admin", icon: ShieldCheck }
    ];

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
            <div className="h-16 px-6 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <img
                        src="/edutrack.logo.png"
                        alt="EduTrack Logo"
                        className="h-10 w-auto object-contain"
                    />

                    <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2">
                        <Search size={18} className="text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="bg-transparent outline-none ml-2"
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                    {/* NOTIFICATIONS */}
                    <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                        <Bell size={20} />
                    </button>

                    {/* PROFILE */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full"
                        >
                            <img
                                src="/user.png"
                                alt="user"
                                className="w-9 h-9 rounded-full"
                            />

                            <div className="flex flex-col leading-tight">
                                <span className="font-medium text-slate-800">
                                    {firstName}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {user?.rol ?? "Estudiante"}
                                </span>
                            </div>

                            <ChevronDown
                                size={14}
                                className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* DROPDOWN */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-xl p-2 z-50">

                                <div className="px-3 py-2 mb-2 border-b border-slate-100">
                                    <span className="text-xs font-semibold text-slate-400 uppercase">
                                        Cambiar vista / rol
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    {roles.map((role) => {
                                        const Icon = role.icon;

                                        const isCurrent =
                                            (role.name === "Estudiante" && user?.rol === "ESTUDIANTE") ||
                                            (role.name === "Docente" && user?.rol === "TEACHER") ||
                                            (role.name === "Administrador" && user?.rol === "ADMIN");

                                        return (
                                            <button
                                                key={role.name}
                                                onClick={() => {
                                                    navigate(role.path);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                                    isCurrent
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "text-slate-600 hover:bg-slate-50"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <span className="p-1.5 rounded-lg bg-slate-100">
                                                        <Icon size={16} />
                                                    </span>
                                                    <span>{role.name}</span>
                                                </div>

                                                {isCurrent && (
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
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

export default Header;