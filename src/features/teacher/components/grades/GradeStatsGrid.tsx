import { TrendingUp, CheckCircle2, ClipboardCopy, BookOpen, Users } from "lucide-react";
import type { StatItem } from "../../data/teacherDashboardData";

interface GradeStatsGridProps {
    stats: StatItem[];
}

function GradeStatsGrid({ stats }: GradeStatsGridProps) {
    const statMap = new Map(stats.map((item) => [item.label, item]));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Promedio General
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Promedio General")?.value ?? "0.0"}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            {statMap.get("Promedio General")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shrink-0">
                    <TrendingUp size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tasa de Aprobación
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Tasa de Aprobación")?.value ?? "0%"}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            {statMap.get("Tasa de Aprobación")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shrink-0">
                    <CheckCircle2 size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-amber-50/10 border border-amber-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">
                        Notas Pendientes
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-amber-600 tracking-tight">
                            {statMap.get("Notas Pendientes")?.value ?? 0}
                        </span>
                        <span className="text-[10px] font-semibold text-amber-400">
                            {statMap.get("Notas Pendientes")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-amber-100 bg-amber-50 text-amber-500 shrink-0 shadow-sm animate-pulse">
                    <ClipboardCopy size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Exámenes Realizados
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Exámenes Realizados")?.value ?? 0}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            {statMap.get("Exámenes Realizados")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-violet-100 bg-violet-50 text-violet-600 shrink-0">
                    <BookOpen size={18} className="stroke-[2.25]" />
                </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Estudiantes Evaluados
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            {statMap.get("Estudiantes Evaluados")?.value ?? 0}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            {statMap.get("Estudiantes Evaluados")?.subtext ?? ""}
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shrink-0">
                    <Users size={18} className="stroke-[2.25]" />
                </div>
            </div>
        </div>
    );
}

export default GradeStatsGrid;
