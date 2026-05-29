import { AlertTriangle, AlertCircle } from "lucide-react";

function AlertsAndPendingCard() {
    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <AlertTriangle size={16} className="text-amber-500 animate-bounce" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Alertas y Pendientes
                </h2>
            </div>

            {/* Alert container (light red) */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4 space-y-2 shadow-sm/5">
                <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs">
                    <AlertCircle size={14} className="text-rose-500 shrink-0" />
                    <span>3 Tareas por calificar</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed font-semibold">
                    Práctica Calificada 1 (ISW-401) requiere revisión urgente.
                </p>
                <div className="flex justify-end pt-1.5 border-t border-rose-100/50">
                    <button className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline transition">
                        Revisar ahora
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertsAndPendingCard;
