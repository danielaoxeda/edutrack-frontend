import { useState, useRef, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function StudentHeader() {
    const [, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { user } = useAuth();
    console.log("USER AUTH:", user);

    const studentName = user?.nombre?.trim() || "Estudiante";
    const firstName = studentName.split(/\s+/)[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                            placeholder="Buscar cursos, tareas..."
                            className="bg-transparent outline-none ml-2 text-sm text-slate-700 placeholder-slate-400 w-full"
                        />
                    </div>

                    {/* NOTIFICATIONS */}
                    <button className="relative w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm text-slate-600 transition duration-200">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                    </button>

                    {/* PROFILE (SIN DROPDOWN DE ROLES) */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center gap-3 bg-white pl-3 pr-4 py-1.5 rounded-full border border-slate-200 shadow-sm min-w-[150px] hover:bg-slate-50 transition-colors"
                        >
                            <div className="relative">
                                <img
                                    src="/user.png"
                                    alt={`Avatar de ${studentName}`}
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/10"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
                                    }}
                                />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                            </div>

                            <div className="flex flex-col leading-tight whitespace-nowrap">
                                <span className="font-bold text-sm text-slate-900">
                                    {studentName}
                                </span>
                                <span className="text-[11px] font-medium text-slate-500">
                                    {user?.email || "Estudiante"}
                                </span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </header>
    );
}

export default StudentHeader;