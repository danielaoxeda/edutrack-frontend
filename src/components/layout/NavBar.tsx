import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const scrollToId = (id: string) => {
        if (pathname !== "/") {
            navigate(`/#${id}`);
            return;
        }

        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link className="flex items-center gap-2" to="/">
                    <span className="text-xl font-bold text-blue-900">EduTrack</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <button onClick={() => scrollToId("features")} className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-900">Funciones</button>
                    <Link className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-900" to="/actividades-estudiante">Académico</Link>
                    <Link className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-900" to="/dashboard-estudiante">Soporte</Link>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/auth")} className="rounded-lg bg-blue-900 px-6 py-2 text-sm font-medium text-white transition-opacity active:opacity-80">Ingresar</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;