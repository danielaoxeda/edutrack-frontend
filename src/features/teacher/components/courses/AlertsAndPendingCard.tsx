import { AlertCircle, AlertTriangle } from "lucide-react";
import type { AcademicAlertItem, PendingReviewItem } from "../../data/teacherDashboardData";

interface AlertsAndPendingCardProps {
    alerts: AcademicAlertItem[];
    pendingReviews: PendingReviewItem[];
}

function AlertsAndPendingCard({ alerts, pendingReviews }: AlertsAndPendingCardProps) {
    const mainAlert = alerts[0];
    const pendingCount = pendingReviews.length;

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <AlertTriangle size={16} className="text-amber-500 animate-bounce" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Alertas y Pendientes
                </h2>
            </div>

            {mainAlert ? (
                <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-4 space-y-3 shadow-sm/5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs">
                            <AlertCircle size={14} className="text-rose-500 shrink-0" />
                            <span>{pendingCount} tareas por calificar</span>
                        </div>
                        <span className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                            {mainAlert.type === "risk" ? "Riesgo" : "Vencidas"}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-rose-950 leading-relaxed">
                            {mainAlert.title}
                        </p>
                        <p className="text-xs text-rose-950/80 leading-relaxed">
                            {mainAlert.description}
                        </p>
                    </div>

                    <div className="flex justify-end pt-1.5 border-t border-rose-100/50">
                        <button className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline transition">
                            {mainAlert.actionLabel}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No hay alertas ni pendientes por revisar.
                </div>
            )}
        </div>
    );
}

export default AlertsAndPendingCard;
