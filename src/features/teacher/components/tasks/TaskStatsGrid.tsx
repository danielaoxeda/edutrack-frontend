import { FileText, ClipboardList, Inbox, AlertTriangle, TrendingUp } from "lucide-react";

function TaskStatsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            
            {/* 1. Tareas activas */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tareas activas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            24
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                            Activo
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 shrink-0">
                    <FileText size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 2. Pendientes revisión */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Pendientes revisión
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            48
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            Por calificar
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-amber-100 bg-amber-50 text-amber-600 shrink-0 animate-pulse">
                    <ClipboardList size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 3. Entregas recibidas */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Entregas recibidas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            156
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                            Enviadas
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shrink-0">
                    <Inbox size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 4. Tareas vencidas */}
            <div className="bg-rose-50/10 border border-rose-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
                        Tareas vencidas
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-rose-600 tracking-tight">
                            3
                        </span>
                        <span className="text-[10px] font-semibold text-rose-400">
                            Requiere atención
                        </span>
                    </div>
                </div>
                <div className="p-3 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 shrink-0 shadow-sm">
                    <AlertTriangle size={18} className="stroke-[2.25]" />
                </div>
            </div>

            {/* 5. Promedio cumplimiento */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Promedio cumplimiento
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                            92%
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <TrendingUp size={10} />
                            <span>1%</span>
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
