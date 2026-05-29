import { Percent, Award, Clock, AlertTriangle, Calendar } from "lucide-react";

function AttendanceStatsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            
            {/* 1. Asistencia Promedio */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Asistencia Promedio
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            92%
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            +1.5%
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-teal-100 bg-teal-50 text-teal-600 shrink-0">
                    <Percent size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 2. Asistencias Perfectas */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Asistencias Perfectas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            45
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-600">
                            Alumnos
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shrink-0">
                    <Award size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 3. Tardanzas Registradas */}
            <div className="bg-amber-50/10 border border-amber-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">
                        Tardanzas de Hoy
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-amber-600 tracking-tight">
                            12
                        </span>
                        <span className="text-[10px] font-semibold text-amber-500">
                            Por justificar
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-amber-100 bg-amber-50 text-amber-500 shrink-0 shadow-sm">
                    <Clock size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 4. Faltas Totales (Crítico) */}
            <div className="bg-rose-50/10 border border-rose-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
                        Faltas de Hoy
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-rose-600 tracking-tight">
                            8
                        </span>
                        <span className="text-[10px] font-semibold text-rose-500">
                            Faltas críticas
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 shrink-0 shadow-sm animate-pulse">
                    <AlertTriangle size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 5. Clases Impartidas */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Clases Impartidas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            16
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            Sesiones
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shrink-0">
                    <Calendar size={18} className="stroke-[2.25]" />
                </div>
            </div>

        </div>
    );
}

export default AttendanceStatsGrid;
