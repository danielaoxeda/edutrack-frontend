import { FileText, ClipboardList, Inbox, AlertTriangle, TrendingUp } from "lucide-react";
import type { StatItem } from "../../data/teacherDashboardData";

interface TaskStatsGridProps {
    stats: StatItem[];
}

function TaskStatsGrid({ stats }: TaskStatsGridProps) {
    const statMap = new Map(stats.map((item) => [item.label, item]));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tareas activas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Tareas activas")?.value ?? 0}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            {statMap.get("Tareas activas")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 shrink-0">
                    <FileText size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Pendientes revisión
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Pendientes revisión")?.value ?? 0}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            {statMap.get("Pendientes revisión")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-amber-100 bg-amber-50 text-amber-600 shrink-0 animate-pulse">
                    <ClipboardList size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Entregas recibidas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Entregas recibidas")?.value ?? 0}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            {statMap.get("Entregas recibidas")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shrink-0">
                    <Inbox size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-rose-50/10 border border-rose-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
                        Tareas vencidas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-rose-600 tracking-tight">
                            {statMap.get("Tareas vencidas")?.value ?? 0}
                        </span>
                        <span className="text-[10px] font-semibold text-rose-400">
                            {statMap.get("Tareas vencidas")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 shrink-0 shadow-sm">
                    <AlertTriangle size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Promedio cumplimiento
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Promedio cumplimiento")?.value ?? "0%"}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <TrendingUp size={10} />
                            <span>{statMap.get("Promedio cumplimiento")?.subtext ?? ""}</span>
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shrink-0">
                    <TrendingUp size={18} className="stroke-[2.25]" />
                </div>
            </div>
        </div>
    );
}

export default TaskStatsGrid;
