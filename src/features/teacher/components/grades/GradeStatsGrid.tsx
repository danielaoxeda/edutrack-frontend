import { TrendingUp, CheckCircle2, ClipboardCopy, BookOpen, Users } from "lucide-react";

function GradeStatsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            
            {/* 1. Promedio General */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Promedio General
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            4.1
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            +2%
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shrink-0">
                    <TrendingUp size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 2. Tasa de Aprobación */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tasa de Aprobación
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            88%
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            +1%
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 shrink-0">
                    <CheckCircle2 size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 3. Notas Pendientes */}
            <div className="bg-amber-50/10 border border-amber-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">
                        Notas Pendientes
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-amber-600 tracking-tight">
                            24
                        </span>
                        <span className="text-[10px] font-semibold text-amber-400">
                            Por registrar
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-amber-100 bg-amber-50 text-amber-500 shrink-0 shadow-sm animate-pulse">
                    <ClipboardCopy size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 4. Exámenes Realizados */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Exámenes Realizados
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            8
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            Tomados
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-violet-100 bg-violet-50 text-violet-600 shrink-0">
                    <BookOpen size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 5. Estudiantes Evaluados */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Estudiantes Evaluados
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            142
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            / 150 total
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
