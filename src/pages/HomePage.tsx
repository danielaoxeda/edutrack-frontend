import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../features/auth/api/authApi";
import { setAuthSession } from "../lib/auth";

function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { hash } = useLocation();

    const scrollToId = (id: string) => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    const resolveDashboard = (role: string) => {
        if (role === "ADMIN") {
            return "/dashboard-admin";
        }

        if (role === "TEACHER") {
            return "/dashboard-docente";
        }

        return "/dashboard-estudiante";
    };

    useEffect(() => {
        if (!hash) {
            return;
        }

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
                        <button className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-900" onClick={() => scrollToId("academics")}>Academico</button>
                        <button className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-900" onClick={() => scrollToId("support")}>Soporte</button>
                    </div>

                    <button
                        className="rounded-lg bg-blue-900 px-6 py-2 text-sm font-medium text-white transition-opacity active:opacity-80"
                        onClick={() => navigate("/auth")}
                    >
                        Ingresar
                    </button>
                </div>
            </nav>

            <main className="pt-16">
                <section className="relative flex min-h-screen items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            className="h-full w-full object-cover opacity-10"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlGAhD6nyoh3nauBPTPN5fEcs62SFNyskQTxjeGZGWg41jlCNfIlenY6xYx4SfOJG9MCLrKRY3DSnFI_kh7TkYIfxqheO0TrFVb-4zBflI7yEr-U2unZEJtdTDbL4pAfyQwHfXZAJurRCSAO-O1eUN5_Hrsp0BRia4T3LGVQV1BFj9SyEHKFsSwLcM9YpzurMr8oNjm14jeWLg3jF8K8aHZYkedbiYIYchAsU3rO_oo-VOVGVP_wcgDcbIoN4z7eceYKym_qEJzi4Y"
                            alt="Campus"
                        />
                        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-slate-50/90 to-blue-100/40" />
                    </div>

                    <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                        <div className="lg:col-span-7">
                            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-800">
                                Sistema de Gestion Academica v4.0
                            </span>
                            <h1 className="mb-6 max-w-2xl text-5xl font-bold leading-tight text-slate-900">
                                Gestion Academica <span className="text-blue-900">Simplificada</span>
                            </h1>
                            <p className="mb-8 max-w-xl text-lg leading-7 text-slate-600">
                                Optimiza la administracion escolar con una plataforma robusta disenada para educadores modernos. Dashboards en tiempo real y seguridad JWT.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    className="flex items-center gap-2 rounded-xl bg-blue-900 px-8 py-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-800"
                                    onClick={() => scrollToId("features")}
                                >
                                    Explorar Funciones
                                </button>
                                <button
                                    className="rounded-xl border border-slate-400 px-8 py-4 text-sm font-medium text-slate-800 transition-all hover:bg-slate-100"
                                    onClick={() => navigate("/auth")}
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
                                    onSubmit={async (event) => {
                                        event.preventDefault();

                                        try {
                                            setLoading(true);
                                            setError(null);
                                            const session = await login({ email, password });
                                            setAuthSession(session);
                                            navigate(resolveDashboard(session.role));
                                        } catch (authError) {
                                            setError(authError instanceof Error ? authError.message : "No se pudo iniciar sesion");
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                >
                                    {error && (
                                        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-slate-800">Correo Electronico</label>
                                        <input
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                                            placeholder="usuario@edutrack.edu"
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-slate-800">Contrasena</label>
                                            <Link className="text-xs font-medium text-blue-900 hover:underline" to="/auth">Olvide mi clave</Link>
                                        </div>
                                        <input
                                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-blue-900 focus:ring-2 focus:ring-blue-900"
                                            placeholder="********"
                                            type="password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required
                                        />
                                    </div>

                                    <button className="w-full rounded-lg bg-blue-900 py-3 text-sm font-medium text-white shadow-md transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={loading}>
                                        {loading ? "Ingresando..." : "Iniciar Sesion Segura"}
                                    </button>
                                </form>

                                <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                                    <p className="text-sm text-slate-600">Protegido por encriptacion JWT y TLS 1.3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-8" id="features">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" id="academics">
                        <div className="mx-auto mb-8 max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-semibold text-slate-900">Caracteristicas de Alto Rendimiento</h2>
                            <p className="text-lg text-slate-600">Disenado para la eficiencia operativa y la toma de decisiones basada en datos.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-8" id="support">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-center md:p-24">
                            <div className="relative z-10 mx-auto max-w-2xl">
                                <h2 className="mb-6 text-5xl font-bold text-white">Listo para transformar tu institucion?</h2>
                                <p className="mb-8 text-lg text-slate-300">Unete a instituciones que ya confian en EduTrack.</p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <button
                                        className="rounded-xl bg-emerald-300 px-8 py-4 text-sm font-medium text-emerald-900 transition-transform hover:scale-105"
                                        onClick={() => navigate("/auth")}
                                    >
                                        Agendar una Demo
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
        </div>
    );
}

export default HomePage;
