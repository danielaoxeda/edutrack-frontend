import { AlertCircle, UserMinus, AlertTriangle, Send } from "lucide-react";
import { alertsData } from "../../data/teacherDashboardData";

function AcademicAlerts() {
    return (
        <div className="flex flex-col">
            {/* Header (External, matching "Mis Cursos Activos") */}
            <div className="flex items-center gap-2 mb-4 py-1">
                <AlertCircle size={18} className="text-red-500" />
                <h2 className="text-lg font-bold text-slate-800">
                    Alertas Académicas
                </h2>
            </div>

            {/* List of Alerts inside White Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                {alertsData.map((alert) => {
                    const isRisk = alert.type === "risk";
                    const Icon = isRisk ? UserMinus : AlertTriangle;
                    const containerClass = isRisk
                        ? "bg-rose-50/60 border-rose-100 text-rose-950"
                        : "bg-amber-50/60 border-amber-100 text-amber-950";
                    const iconClass = isRisk
                        ? "bg-rose-100 text-rose-600 border-rose-200/50"
                        : "bg-amber-100 text-amber-600 border-amber-200/50";
                    const actionClass = isRisk
                        ? "text-rose-600 hover:text-rose-700 hover:underline"
                        : "text-amber-600 hover:text-amber-700 hover:underline";

                    return (
                        <div
                            key={alert.id}
                            className={`p-4 rounded-xl border ${containerClass} space-y-3 shadow-sm`}
                        >
                            {/* Alert Header */}
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg border ${iconClass} flex items-center justify-center shrink-0`}>
                                    <Icon size={16} />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="font-bold text-sm text-slate-800">
                                        {alert.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-normal font-medium">
                                        {alert.description}
                                    </p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end pt-1 border-t border-slate-100/50">
                                <button className={`text-xs font-bold flex items-center gap-1 transition ${actionClass}`}>
                                    {alert.type === "overdue" && <Send size={11} />}
                                    <span>{alert.actionLabel}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AcademicAlerts;
