import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/api/authApi";
import { setAuthSession } from "../lib/auth";

type AuthTab = "login" | "register";

const AuthPage = () => {
    const [tab, setTab] = useState<AuthTab>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const resolveDashboard = (role: string) => {
        if (role === "ADMIN") {
            return "/dashboard-admin";
        }

        if (role === "TEACHER") {
            return "/dashboard-docente";
        }

        return "/dashboard-estudiante";
    };

    return (
        <div className="min-h-screen bg-background text-on-background font-body-md flex flex-col">
            <nav className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 left-0 w-full z-50">
                <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-10 h-16 max-w-360 mx-auto">
                    <Link className="flex items-center gap-2" to="/">
                        <span className="text-headline-sm font-headline-sm font-bold text-primary">EduTrack</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" to="/#features">Funciones</Link>
                        <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" to="/actividades-estudiante">Académico</Link>
                        <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" to="/dashboard-estudiante">Soporte</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="bg-primary text-on-primary px-4 py-2 rounded font-label-md text-label-md hover:opacity-90 transition-opacity" onClick={() => setTab("login")}>Ingresar</button>
                    </div>
                </div>
            </nav>

            <main className="grow flex items-stretch pt-16">
                <section className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary-container items-center justify-center p-8">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Entorno académico"
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQREVpplWW_BXf2nwcyWq2YXFl7Ikzvss8Q64Zh-vD5-80tTR8eZhKzTIrhbv15mCO1ixUrlx2tcfcXGYAUOSAUKSWt8fZYPViRtJ_hv7lTU3PfpxG9Pxvz6UJIfQcmuOYItmSDOjlwfjrDfiS-IJEb5hldoCnFVOeBzklhobgML2fJ5zBLboSj-uJRTCZVxNbL5_0yV_iYgkxRCnlfasQI79Vqfq_nl-jadbVMsy9Sp3x3pkmFXa0atp3SEDRZA2BcR32_nZkJQA7"
                        />
                    </div>

                    <div className="relative z-10 max-w-lg text-on-primary">
                        <h1 className="font-display-lg text-display-lg mb-4">Impulsando la Excelencia Académica</h1>
                        <p className="font-body-lg text-body-lg mb-8 opacity-90">
                            Experimenta la nueva generación de gestión institucional. EduTrack Pro ofrece una interfaz fluida para administradores,
                            docentes y estudiantes en entornos de alta densidad de información.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded border border-white/20">
                                <span className="material-symbols-outlined text-secondary-container mb-2">analytics</span>
                                <h3 className="font-label-md text-label-md font-bold mb-1">Insights en tiempo real</h3>
                                <p className="font-body-sm text-body-sm opacity-80">Monitorea rendimiento y asistencia de un vistazo.</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded border border-white/20">
                                <span className="material-symbols-outlined text-secondary-container mb-2">security</span>
                                <h3 className="font-label-md text-label-md font-bold mb-1">Datos Seguros</h3>
                                <p className="font-body-sm text-body-sm opacity-80">Seguridad de nivel empresarial para registros institucionales.</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-primary-container to-transparent opacity-50"></div>
                </section>

                <section className="w-full lg:w-1/2 bg-surface flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 opacity-5"
                        style={{
                            backgroundColor: "#f8f9ff",
                            backgroundImage:
                                "radial-gradient(#3755c3 0.5px, transparent 0.5px), radial-gradient(#3755c3 0.5px, #f8f9ff 0.5px)",
                            backgroundSize: "20px 20px",
                            backgroundPosition: "0 0, 10px 10px",
                        }}
                    />

                    <div className="relative z-10 w-full max-w-120">
                        <div className="bg-surface-container-lowest border border-outline-variant rounded shadow-sm overflow-hidden">
                            <div className="flex border-b border-outline-variant">
                                <button
                                    className={`flex-1 py-4 font-label-md text-label-md transition-all ${
                                        tab === "login"
                                            ? "text-primary border-b-2 border-primary bg-surface-container-low font-bold"
                                            : "text-on-surface-variant hover:bg-surface-variant/10"
                                    }`}
                                    onClick={() => setTab("login")}
                                >
                                    Iniciar sesión
                                </button>

                            </div>

                            <div className="p-8">
                                {tab === "login" ? (
                                    <div className="transition-all duration-300 ease-in-out opacity-100">
                                        <div className="mb-8">
                                            <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Bienvenido de nuevo</h2>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">Accede a tu panel institucional y herramientas.</p>
                                        </div>

                                        <form
                                            className="space-y-4"
                                            onSubmit={async (event) => {
                                                event.preventDefault();

                                                try {
                                                    setLoading(true);
                                                    setError(null);

                                                    const session = await login({ email, password });
                                                    setAuthSession(session);
                                                    navigate(resolveDashboard(session.role));
                                                } catch (authError) {
                                                    setError(authError instanceof Error ? authError.message : "No se pudo iniciar sesión");
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

                                            <div>
                                                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Correo institucional</label>
                                                <input
                                                    className="w-full px-4 py-2 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                                                    placeholder="nombre@universidad.edu (ej. docente@universidad.edu)"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label className="font-label-sm text-label-sm text-on-surface-variant">Contraseña</label>
                                                    <Link className="font-label-sm text-label-sm text-primary hover:underline" to="/auth">
                                                        ¿Olvidaste tu contraseña?
                                                    </Link>
                                                </div>
                                                <input
                                                    className="w-full px-4 py-2 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                                                    placeholder="••••••••"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <input className="w-4 h-4 text-primary rounded border-outline focus:ring-primary" id="remember" type="checkbox" />
                                                <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="remember">
                                                    Mantener sesión iniciada por 30 días
                                                </label>
                                            </div>

                                            <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8" type="submit" disabled={loading}>
                                                {loading ? "Ingresando..." : "Iniciar sesión"}
                                                <span className="material-symbols-outlined text-sm">login</span>
                                            </button>

                                            <p className="text-center text-[11px] text-slate-400 mt-4 leading-normal">
                                                Tip: Usa <span className="font-semibold text-blue-700">"docente"</span> o <span className="font-semibold text-blue-700">"teacher"</span> para Profesor, o <span className="font-semibold text-blue-700">"admin"</span> para Administrador.
                                            </p>
                                        </form>

                                        <div className="mt-8 pt-8 border-t border-outline-variant flex flex-col gap-2">
                                            <p className="text-center font-body-sm text-body-sm text-on-surface-variant">O continúa con</p>
                                            <div className="flex gap-2">
                                                <button className="flex-1 border border-outline-variant py-2 rounded flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors font-label-md text-label-md" type="button">
                                                    Google
                                                </button>
                                                <button className="flex-1 border border-outline-variant py-2 rounded flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors font-label-md text-label-md" type="button">
                                                    Microsoft
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="transition-all duration-300 ease-in-out opacity-100">
                                        <div className="mb-8">
                                            <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Crear cuenta</h2>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">Únete a la comunidad académica de EduTrack.</p>
                                        </div>

                                        <form
                                            className="space-y-4"
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                navigate("/dashboard-estudiante");
                                            }}
                                        >
                                            <div>
                                                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Nombre completo</label>
                                                <input
                                                    className="w-full px-4 py-2 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                                                    placeholder="Dra. Ana Pérez"
                                                    type="text"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Correo electrónico</label>
                                                <input
                                                    className="w-full px-4 py-2 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                                                    placeholder="ana.perez@edu.com"
                                                    type="email"
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Rol institucional</label>
                                                <select className="w-full px-4 py-2 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md appearance-none">
                                                    <option value="student">Estudiante</option>
                                                    <option value="teacher">Docente</option>
                                                    <option value="admin">Administrador</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Contraseña</label>
                                                    <input
                                                        className="w-full px-4 py-2 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                                                        placeholder="••••••••"
                                                        type="password"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Confirmar contraseña</label>
                                                    <input
                                                        className="w-full px-4 py-2 rounded border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                                                        placeholder="••••••••"
                                                        type="password"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2 pt-1">
                                                <input className="mt-1 w-4 h-4 text-primary rounded border-outline focus:ring-primary" id="terms" type="checkbox" />
                                                <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                                                    Acepto los <Link className="text-primary hover:underline" to="/">Términos del Servicio</Link> y la{" "}
                                                    <Link className="text-primary hover:underline" to="/">Política de Privacidad</Link>
                                                </label>
                                            </div>

                                            <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8" type="submit">
                                                Crear cuenta
                                                <span className="material-symbols-outlined text-sm">person_add</span>
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-10 py-8 w-full max-w-360 mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
                        <span className="font-label-md text-label-md font-bold text-primary">EduTrack</span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 EduTrack Academic Systems. Todos los derechos reservados.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/">Política de Privacidad</Link>
                        <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/">Términos del Servicio</Link>
                        <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/">Accesibilidad</Link>
                        <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/auth">Contacto</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthPage;
