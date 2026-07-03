import { AlertCircle, FileText, UserMinus, AlertTriangle } from "lucide-react";
import type { StudentAlertItem } from "../../data/teacherDashboardData";

interface StudentAlertsCardProps {
    alerts: StudentAlertItem[];
}

function StudentAlertsCard({ alerts }: StudentAlertsCardProps) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-500" />
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Alertas Académicas
                    </h2>
                </div>
                {alerts.length > 0 && (
                    <span className="text-[10px] font-extrabold bg-red-600 text-white px-2.5 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                        {alerts.length} nuevas
                    </span>
                )}
            </div>

            <div className="space-y-4 mb-4">
                {alerts.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                        No hay alertas academicas con los datos registrados.
                    </p>
                )}
                {alerts.map((alert) => {
                    const isAttendance = alert.type === "attendance";
                    const isGrade = alert.type === "grade";
                    const Icon = isAttendance ? UserMinus : isGrade ? AlertTriangle : FileText;

                    let bgAlert = "bg-rose-50/50 border-rose-100 text-rose-950";
                    let metaTextClass = "text-rose-600";

                    if (alert.type === "homework") {
                        bgAlert = "bg-amber-50/50 border-amber-100 text-amber-950";
                        metaTextClass = "text-amber-600";
                    }

                    return (
                        <div key={alert.id} className={`p-4 rounded-xl border ${bgAlert} space-y-2 shadow-sm/5`}>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-extrabold text-slate-800">
                                    {alert.studentName}
                                </span>
                                <span className="text-slate-400 font-semibold">
                                    {alert.timeText}
                                </span>
                            </div>

                            <p className="text-[11px] font-semibold text-slate-600 leading-normal">
                                {alert.description}
                            </p>

                            <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-100/50">
                                <Icon size={12} className={`shrink-0 ${metaTextClass}`} />
                                <span className={`text-[10px] font-extrabold uppercase tracking-wide ${metaTextClass}`}>
                                    {alert.metaLabel}: {alert.metaValue}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default StudentAlertsCard;
