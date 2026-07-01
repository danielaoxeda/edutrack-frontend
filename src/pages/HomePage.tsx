import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { hash } = useLocation();

    const scrollToId = (id: string) => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (!hash) return;
        const id = hash.replace("#", "");
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }, [hash]);

    return (
        <div className="bg-slate-50 text-slate-900">
            <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link className="flex items-center gap-2" to="/">
                        <span className="text-xl font-bold text-blue-900">EduTrack</span>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        <button className="border-b-2 border-blue-900 text-sm font-semibold text-blue-900 transition-colors hover:text-blue-700" onClick={() => scrollToId("features")}>Funciones</button>
                        <button className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-900" onClick={() => scrollToId("academics")}>Académico</button>
                        <button className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-900" onClick={() => scrollToId("support")}>Soporte</button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            className="rounded-lg bg-blue-900 px-6 py-2 text-sm font-medium text-white transition-opacity active:opacity-80"
                            onClick={() => navigate("/auth")}
                        >
                            Ingresar
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-16">
                <section className="relative flex min-h-screen items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            className="h-full w-full object-cover opacity-10"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlGAhD6nyoh3nauBPTPN5fEcs62SFNyskQTxjeGZGWg41jlCNfIlenY6xYx4SfOJG9MCLrKRY3DSnFI_kh7TkYIfxqheO0TrFVb-4zBflI7yEr-U2unZEJtdTDbL4pAfyQwHfXZAJurRCSAO-O1eUN5_Hrsp0BRia4T3LGVQV1BFj9SyEHKFsSwLcM9YpzurMr8oNjm14jeWLg3jF8K8aHZYkedbiYIYchAsU3rO_oo-VOVGVP_wcgDcbIoN4z7eceYKym_qEJzi4Y"
                            alt="A bright and modern university study space"
                        />
                        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-slate-50/90 to-blue-100/40"></div>
                    </div>

                    <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                        <div className="lg:col-span-7">
                            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-800">
                                Sistema de Gestión Académica v4.0
                            </span>
                            <h1 className="mb-6 max-w-2xl text-5xl font-bold leading-tight text-slate-900">
                                Gestión Académica <span className="text-blue-900">Simplificada</span>
                            </h1>
                            <p className="mb-8 max-w-xl text-lg leading-7 text-slate-600">
                                Optimiza la administración escolar con una plataforma robusta diseñada para educadores modernos. Dashboards en tiempo real y seguridad JWT.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="flex items-center gap-2 rounded-xl bg-blue-900 px-8 py-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-800"
                                    onClick={() => scrollToId("features")}
                                >
                                    Explorar Funciones
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                                <button
                                    className="rounded-xl border border-slate-400 px-8 py-4 text-sm font-medium text-slate-800 transition-all hover:bg-slate-100"
                                    onClick={() => navigate("/dashboard-estudiante")}
                                >
                                    Ver Demo
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-5" id="login-section">
                            <div className="rounded-xl border-t-4 border-blue-900 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
                                <div className="mb-8 text-center">
                                    <h2 className="mb-1 text-2xl font-semibold text-slate-900">Acceso Institucional</h2>
                                    <p className="text-sm text-slate-600">Ingresa tus credenciales para continuar</p>
                                </div>
                                <form
                                    className="space-y-6"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        const emailLower = email.toLowerCase();
                                        if (emailLower.includes("admin") || emailLower.includes("administrador")) {
                                            navigate("/dashboard-admin");
                                        } else if (emailLower.includes("teacher") || emailLower.includes("docente") || emailLower.includes("profesor")) {
                                            navigate("/dashboard-docente");
                                        } else {
                                            navigate("/dashboard-estudiante");
                                        }
                                    }}
                                >
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-800">Correo Electrónico</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">mail</span>
                                            <input
                                                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900 font-body-md"
                                                placeholder="usuario@edutrack.edu (ej. docente@edutrack.edu)"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-slate-800">Contraseña</label>
                                            <Link className="text-xs font-medium text-blue-900 hover:underline" to="/auth">¿Olvidaste tu clave?</Link>
                                        </div>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">lock</span>
                                            <input
                                                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900 font-body-md"
                                                placeholder="••••••••"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input className="h-4 w-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900" id="remember" type="checkbox" />
                                        <label className="text-sm text-slate-600" htmlFor="remember">Mantener sesión iniciada</label>
                                    </div>

                                    <button className="w-full rounded-lg bg-blue-900 py-3 text-sm font-medium text-white shadow-md transition-transform hover:scale-[1.02] active:scale-95" type="submit">
                                        Iniciar Sesión Segura
                                    </button>

                                    <p className="text-center text-[11px] text-slate-400 mt-4 leading-normal">
                                        Tip: Usa <span className="font-semibold text-blue-700">"docente"</span> para Profesor, o <span className="font-semibold text-blue-700">"admin"</span> para Administrador.
                                    </p>
                                </form>

                                <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                                    <p className="text-sm text-slate-600">Protegido por encriptación JWT y TLS 1.3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-8" id="features">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" id="academics">
                        <div className="mx-auto mb-8 max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-semibold text-slate-900">Características de Alto Rendimiento</h2>
                            <p className="text-lg text-slate-600">Diseñado para la eficiencia operativa y la toma de decisiones basada en datos precisos.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="group relative overflow-hidden rounded-xl border border-slate-300 bg-slate-100 p-8 transition-all hover:border-blue-900 md:col-span-2">
                                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                                    <div>
                                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900 text-white">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                                        </div>
                                        <h3 className="mb-4 text-2xl font-semibold text-slate-900">Rutas Protegidas</h3>
                                        <p className="max-w-md text-base leading-6 text-slate-600">
                                            Arquitectura basada en roles con middleware de autenticación robusto. Solo el personal autorizado accede a información sensible de estudiantes y docentes.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="rounded bg-emerald-200 px-2 py-1 text-xs font-semibold text-emerald-800">JWT Auth</span>
                                        <span className="rounded bg-emerald-200 px-2 py-1 text-xs font-semibold text-emerald-800">Role-Based Access</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-900/5 blur-3xl transition-colors group-hover:bg-blue-900/10"></div>
                            </div>

                            <div className="flex flex-col justify-between rounded-xl border border-slate-300 bg-slate-900 p-8">
                                <div>
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-200 text-emerald-800">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
                                    </div>
                                    <h3 className="mb-4 text-xl font-semibold text-white">Gestión de Notas</h3>
                                    <p className="text-sm leading-6 text-slate-300">
                                        Sistema de calificación flexible con soporte para promedios ponderados, rúbricas personalizadas y exportación inmediata a boletines oficiales.
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <img
                                        className="h-32 w-full rounded-lg object-cover opacity-60"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfRkttaYuXAkQBRUc2AoFT86cfqPcFtQvM-SHyA4EahskZRhxonY7eORRj7pZax9r4J2yQv6f3NmfeeD-1PsJtjyb2PTctZRygrAWPd4Q9wJH_2p_QaNkz-zKmeow7GB6lnq2Slk4EAp624Jdi2ledPy_e2uvdnBe2A83VNYngFUPFq0pVVGg6zJJjKmHUClJXa6RzY2LWiiYFhoeYATESUsjD4yXCTq-S8DpqwxZaFwvv7hFF8c9xemctVvU01UCvEmNf6y2j87Rv"
                                        alt="A close-up shot of a sophisticated data interface"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col items-center rounded-xl border border-slate-300 bg-slate-100 p-8 text-center transition-all hover:shadow-lg">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                                    <span className="material-symbols-outlined text-4xl">dashboard</span>
                                </div>
                                <h3 className="mb-4 text-xl font-semibold text-slate-900">Dashboards en Tiempo Real</h3>
                                <p className="mb-6 text-sm leading-6 text-slate-600">
                                    Visualiza la asistencia, el rendimiento y la salud financiera de tu institución en un solo vistazo dinámico.
                                </p>
                                <div className="w-full space-y-2">
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-300">
                                        <div className="h-full w-[85%] bg-blue-900 transition-all duration-1000"></div>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-300">
                                        <div className="h-full w-[60%] bg-emerald-700 transition-all duration-1000"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-xl bg-linear-to-r from-blue-900 to-blue-700 p-8 text-white md:col-span-2" id="support">
                                <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-4 text-2xl font-semibold">Infraestructura Escalable</h3>
                                        <p className="mb-6 text-base opacity-90">
                                            Nuestra API REST garantiza que EduTrack crezca con tu institución, desde 100 hasta 100,000 estudiantes sin pérdida de rendimiento.
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> 99.9% de Disponibilidad</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> Soporte 24/7</li>
                                            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> Backups Automáticos</li>
                                        </ul>
                                    </div>
                                    <div className="relative hidden md:block">
                                        <span className="material-symbols-outlined absolute -right-4 top-1/2 -translate-y-1/2 text-[160px] opacity-20">cloud_done</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-8">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-center md:p-24">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
                            </div>
                            <div className="relative z-10 mx-auto max-w-2xl">
                                <h2 className="mb-6 text-5xl font-bold text-white">¿Listo para transformar tu institución?</h2>
                                <p className="mb-8 text-lg text-slate-300">Únete a cientos de instituciones que ya confían en EduTrack para su éxito académico.</p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <button
                                        className="rounded-xl bg-emerald-300 px-8 py-4 text-sm font-medium text-emerald-900 transition-transform hover:scale-105"
                                        onClick={() => navigate("/auth")}
                                    >
                                        Agendar una Demo Gratis
                                    </button>
                                    <Link className="rounded-xl border border-white px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10" to="/auth">
                                        Contactar Ventas
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200 bg-slate-100">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
                    <div className="mb-6 md:mb-0">
                        <span className="text-sm font-bold text-blue-900">EduTrack</span>
                        <p className="mt-2 text-sm text-slate-600">© 2024 EduTrack Academic Systems. All rights reserved.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link className="text-sm text-slate-600 transition-colors hover:text-blue-900" to="/">Política de Privacidad</Link>
                        <Link className="text-sm text-slate-600 transition-colors hover:text-blue-900" to="/">Términos del Servicio</Link>
                        <Link className="text-sm text-slate-600 transition-colors hover:text-blue-900" to="/">Accesibilidad</Link>
                        <Link className="text-sm text-slate-600 transition-colors hover:text-blue-900" to="/auth">Contacto</Link>
                    </div>
                    <div className="mt-6 flex items-center gap-4 md:mt-0">
                        <span className="material-symbols-outlined cursor-pointer text-slate-600 transition-colors hover:text-blue-900">public</span>
                        <span className="material-symbols-outlined cursor-pointer text-slate-600 transition-colors hover:text-blue-900">chat</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

