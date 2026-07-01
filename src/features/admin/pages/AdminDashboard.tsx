import {
    ShieldCheck,
    FileText,
    Users,
    Zap,
    Server,
    Clock,
    Settings,
} from "lucide-react";

import AdminLayout from "../../../layout/AdminLayout";
import {
    adminStats,
    adminUsers,
    adminLogs,
} from "../data/adminDashboardData";

function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="w-full space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {adminStats.map((stat) => {
                        const iconMap: { [key: number]: React.ReactNode } = {
                            1: <Users size={32} className="text-blue-600" />,
                            2: <Zap size={32} className="text-emerald-600" />,
                            3: <Server size={32} className="text-purple-600" />,
                            4: <Clock size={32} className="text-amber-600" />,
                        };
                        return (
                            <div
                                key={stat.id}
                                className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ${stat.color} flex items-center justify-between`}
                            >
                                <div>
                                    <p className="text-sm font-semibold text-slate-600">
                                        {stat.title}
                                    </p>
                                    <p className="mt-4 text-3xl font-bold text-slate-900">
                                        {stat.value}
                                    </p>
                                    <p className="mt-2 text-sm text-slate-500">
                                        {stat.description}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 opacity-20">
                                    {iconMap[stat.id]}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <section className="xl:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex flex-col gap-4 p-6 border-b border-slate-200 bg-slate-50">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                                    Gestión de usuarios
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                                    Usuarios recientes
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                                    Añadir usuario
                                </button>
                                <button className="rounded-2xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition">
                                    Exportar CSV
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left divide-y divide-slate-200">
                                <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-[0.08em]">
                                    <tr>
                                        <th className="px-6 py-4">Nombre</th>
                                        <th className="px-6 py-4">Rol</th>
                                        <th className="px-6 py-4">Estado</th>
                                        <th className="px-6 py-4">Último inicio</th>
                                        <th className="px-6 py-4 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {adminUsers.map((user) => {
                                        const lastLoginMap: { [key: number]: string } = {
                                            1: "Hace 2 min",
                                            2: "Hace 1 hora",
                                            3: "Ayer",
                                            4: "Hace 3 días",
                                        };
                                        return (
                                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">
                                                            {user.name.split(" ").map((part) => part[0]).join("")}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-900">{user.name}</p>
                                                            <p className="text-sm text-slate-500">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{user.role}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.statusClass}`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{lastLoginMap[user.id] || ""}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="inline-flex items-center gap-2 text-slate-500">
                                                        <button className="rounded-full p-2 hover:bg-slate-100 transition" title="Editar">
                                                            <FileText size={18} />
                                                        </button>
                                                        <button className="rounded-full p-2 hover:bg-red-100 text-red-600 transition" title="Eliminar">
                                                            <ShieldCheck size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-4 p-6 border-t border-slate-200 bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-sm text-slate-500">Mostrando 4 de 12,842 usuarios</span>
                            <div className="flex flex-wrap items-center gap-2">
                                <button className="rounded-2xl border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 transition">Ant.</button>
                                <button className="rounded-2xl bg-slate-900 px-3 py-1 text-sm font-semibold text-white">1</button>
                                <button className="rounded-2xl border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 transition">2</button>
                                <button className="rounded-2xl border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 transition">Sig.</button>
                            </div>
                        </div>
                    </section>

                    <aside className="xl:col-span-4">
                        <section className="rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between gap-4 p-6 border-b border-white/10">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.16em] text-slate-300">Registros en vivo</p>
                                    <h3 className="mt-2 text-xl font-semibold">Estado del sistema</h3>
                                </div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                                    <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" /> EN VIVO
                                </span>
                            </div>

                            <div className="space-y-4 p-6 text-sm font-mono text-slate-300 max-h-[420px] overflow-y-auto">
                                {adminLogs.map((log, index) => (
                                    <p key={index} className={index === 3 ? "text-slate-400" : ""}>
                                        <span className="text-emerald-300">[{`14:${22 + index}:0${index}`} ]</span> {log}
                                    </p>
                                ))}
                            </div>

                            <div className="space-y-4 p-6 border-t border-white/10 bg-slate-800">
                                <div className="flex items-center justify-between text-sm text-slate-300">
                                    <span>Uso CPU</span>
                                    <span className="font-semibold text-white">24%</span>
                                </div>
                                <div className="w-full rounded-full bg-slate-700 h-2 overflow-hidden">
                                    <div className="h-full w-[24%] bg-emerald-400" />
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>

                <section className="xl:col-span-12 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex items-center gap-3">
                        <Settings className="text-slate-900" size={24} />
                        <div>
                            <h3 className="text-2xl font-semibold text-slate-900">Configuración del sistema</h3>
                            <p className="text-sm text-slate-500 mt-1">Configuración institucional central y fechas de términos académicos</p>
                        </div>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Período académico</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-2">Nombre del período actual</label>
                                    <input
                                        type="text"
                                        defaultValue="Otoño 2024 - Semestre 1"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-2">Fecha de inicio</label>
                                        <input type="date" defaultValue="2024-09-01" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-2">Fecha de fin</label>
                                        <input type="date" defaultValue="2024-12-22" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Información de institución</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-2">Nombre de institución</label>
                                    <input
                                        type="text"
                                        defaultValue="EduTrack Academia Global"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-2">Zona horaria del sistema</label>
                                    <select className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm">
                                        <option>(GMT-05:00) Hora de América del Este</option>
                                        <option>(GMT-08:00) Hora de América del Pacífico</option>
                                        <option>(GMT+00:00) Londres</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-3">Resumen de salud del sistema</h4>
                                <p className="text-sm text-slate-600 mb-4">Todos los módulos principales funcionan dentro de los parámetros esperados.</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">BD_SINCR: OK</span>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">ALMACEN: 65%</span>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">SRV_AUTH: ACTIVO</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-slate-900 text-white rounded-lg py-2 font-semibold text-sm hover:bg-slate-800 transition">
                                Guardar cambios del sistema
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
