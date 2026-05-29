import { Users, CheckCircle2, AlertTriangle, TrendingUp, CalendarCheck } from "lucide-react";

function StudentStatsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            
            {/* 1. Total Estudiantes */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Total Estudiantes
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            142
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            +3%
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shrink-0">
                    <Users size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 2. Activos */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Activos
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            135
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            95% del total
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shrink-0">
                    <CheckCircle2 size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 3. En Riesgo (Highlighted in Red border/bg) */}
            <div className="bg-red-50/10 border border-red-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">
                        En Riesgo
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-red-600 tracking-tight">
                            7
                        </span>
                        <span className="text-[10px] font-semibold text-red-400">
                            Requieren atención
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-red-100 bg-red-50 text-red-500 shrink-0 shadow-sm animate-pulse">
                    <AlertTriangle size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 4. Promedio General */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Promedio General
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            4.1
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                            / 5.0
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-violet-100 bg-violet-50 text-violet-600 shrink-0">
                    <TrendingUp size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 5. Asistencia Promedio */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Asistencia Promedio
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            92%
                        </span>
                        <span className="text-xs font-bold text-red-500 bg-red-50 border border-red-100/50 px-1.5 py-0.5 rounded">
                            -1%
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-amber-100 bg-amber-50 text-amber-500 shrink-0">
                    <CalendarCheck size={18} className="stroke-[2.25]" />
                </div>
            </div>

        </div>
    );
}

export default StudentStatsGrid;
