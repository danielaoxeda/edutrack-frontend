import { CalendarRange, ShieldCheck, SlidersHorizontal } from "lucide-react";
import AdminLayout from "../../../layout/AdminLayout";
import { useAdminOverview } from "../hooks/useAdminOverview";

function AdminSettings() {
    const { overview, loading, error } = useAdminOverview();
    const activePeriod = overview?.periods.find((period) => period.estado === "ACTIVO") ?? overview?.periods[0];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Configuracion institucional
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                        Periodo, roles y gobernanza
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm text-slate-600">
                        Esta vista resume lo que hoy manda sobre el sistema: periodo academico activo y estructura de roles.
                    </p>
                </div>

                {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-3">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                                <CalendarRange size={22} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-950">Periodo activo</h2>
                                <p className="text-sm text-slate-500">Lectura directa desde la base de datos.</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
                                Cargando periodo...
                            </div>
                        ) : activePeriod ? (
                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                <div className="rounded-3xl bg-slate-950 p-5 text-white">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">Nombre</p>
                                    <h3 className="mt-3 text-2xl font-black">{activePeriod.nombre}</h3>
                                </div>
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Inicio</p>
                                    <h3 className="mt-3 text-lg font-bold text-slate-900">{activePeriod.fechaInicio}</h3>
                                </div>
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Fin</p>
                                    <h3 className="mt-3 text-lg font-bold text-slate-900">{activePeriod.fechaFin}</h3>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
                                No hay un periodo academico cargado.
                            </div>
                        )}
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                                <SlidersHorizontal size={22} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-950">Estado del modulo</h2>
                                <p className="text-sm text-slate-500">Lectura operativa.</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Usuarios</p>
                                <p className="mt-2 text-2xl font-black text-slate-950">{overview?.summary.totalUsers ?? 0}</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Cursos</p>
                                <p className="mt-2 text-2xl font-black text-slate-950">{overview?.summary.totalCourses ?? 0}</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Matriculas</p>
                                <p className="mt-2 text-2xl font-black text-slate-950">{overview?.summary.totalEnrollments ?? 0}</p>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-950">Roles disponibles</h2>
                            <p className="text-sm text-slate-500">Base para permisos, JWT y vistas por actor.</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {(overview?.roles ?? []).map((role) => (
                            <span key={role.id} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700">
                                {role.nombre}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

export default AdminSettings;
