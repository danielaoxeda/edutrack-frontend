import { Activity, BookOpen, GraduationCap, Settings, Users } from "lucide-react";
import AdminLayout from "../../../layout/AdminLayout";
import { useAdminOverview } from "../hooks/useAdminOverview";

function AdminDashboard() {
    const { overview, loading, error } = useAdminOverview();
    const stats = [
        {
            id: "users",
            title: "Usuarios activos",
            value: overview?.summary.totalUsers ?? 0,
            description: "Base total conectada al sistema",
            icon: <Users size={28} className="text-blue-600" />,
        },
        {
            id: "teachers",
            title: "Profesores",
            value: overview?.summary.totalTeachers ?? 0,
            description: "Perfiles docentes registrados",
            icon: <GraduationCap size={28} className="text-emerald-600" />,
        },
        {
            id: "courses",
            title: "Cursos activos",
            value: overview?.summary.totalCourses ?? 0,
            description: overview?.summary.activePeriodName ?? "Sin periodo activo",
            icon: <BookOpen size={28} className="text-violet-600" />,
        },
        {
            id: "enrollments",
            title: "Matriculas",
            value: overview?.summary.totalEnrollments ?? 0,
            description: "Relacion real de estudiantes por seccion",
            icon: <Activity size={28} className="text-amber-600" />,
        },
    ];

    const recentUsers = overview?.users.slice(0, 6) ?? [];
    const spotlightSections = overview?.sections.slice(0, 5) ?? [];

    return (
        <AdminLayout>
            <div className="w-full space-y-8">
                {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
                                    <p className="mt-4 text-4xl font-black tracking-tight text-slate-950">{stat.value}</p>
                                    <p className="mt-2 text-sm text-slate-500">{stat.description}</p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-3">
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm xl:col-span-8">
                        <div className="border-b border-slate-200 bg-slate-50 p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                                Gestion real
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                                Usuarios recientes
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Cuentas y roles tomados desde base de datos.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-left">
                                <thead className="bg-slate-50 text-sm uppercase tracking-[0.08em] text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4">Nombre</th>
                                        <th className="px-6 py-4">Rol</th>
                                        <th className="px-6 py-4">Estado</th>
                                        <th className="px-6 py-4">Perfil</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-sm text-slate-500">
                                                Cargando usuarios del administrador...
                                            </td>
                                        </tr>
                                    ) : recentUsers.map((user) => (
                                        <tr key={user.id} className="transition-colors hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
                                                        {user.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{user.fullName}</p>
                                                        <p className="text-sm text-slate-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{user.roles.join(", ") || "Sin rol"}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                    {user.estado}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {user.docenteId ? "Docente" : user.estudianteId ? "Estudiante" : "Cuenta general"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <aside className="xl:col-span-4">
                        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-sm">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 p-6">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.16em] text-slate-300">Cursos y secciones</p>
                                    <h3 className="mt-2 text-xl font-semibold">Panorama academico</h3>
                                </div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                                    <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" /> EN LINEA
                                </span>
                            </div>

                            <div className="space-y-4 p-6">
                                {loading ? (
                                    <p className="text-sm text-slate-300">Cargando secciones...</p>
                                ) : spotlightSections.map((section) => (
                                    <article key={section.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                                        <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">{section.cursoCodigo}</p>
                                        <h4 className="mt-2 text-lg font-bold text-white">{section.cursoNombre}</h4>
                                        <p className="mt-1 text-sm text-slate-300">{section.nombre} · {section.periodoNombre}</p>
                                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                                            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
                                                {section.enrolledCount}/{section.capacidad}
                                            </span>
                                            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">
                                                {section.docentes.length > 0 ? section.docentes.join(", ") : "Sin docente"}
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>

                <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-200 p-6">
                        <Settings className="text-slate-900" size={24} />
                        <div>
                            <h3 className="text-2xl font-semibold text-slate-900">Radar del administrador</h3>
                            <p className="mt-1 text-sm text-slate-500">Lo que hoy ya puedes operar sin mock.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-900">Usuarios y roles</h4>
                            <p className="text-sm text-slate-600">El alta de profesores ya crea la cuenta, el perfil docente y el rol correspondiente.</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-900">Cursos y secciones</h4>
                            <p className="text-sm text-slate-600">El modulo de cursos queda listo para abrir secciones y hacer asignaciones reales.</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <h4 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-900">Consolidacion</h4>
                            <p className="text-sm text-slate-600">La siguiente union natural es conectar este flujo admin con la experiencia docente ya integrada.</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">JWT listo</span>
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">BD conectada</span>
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Admin operativo</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
