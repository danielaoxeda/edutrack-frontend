import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import type { PendingReviewItem } from "../../data/teacherDashboardData";

interface PendingReviewsProps {
    pendingReviews: PendingReviewItem[];
}

function PendingReviews({ pendingReviews }: PendingReviewsProps) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <ClipboardList size={18} className="text-blue-600" />
                    <h2 className="text-lg font-bold text-slate-800">
                        Tareas por Revisar
                    </h2>
                </div>
                <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2.5 py-0.5 rounded-full border border-amber-100/50">
                    {pendingReviews.length} pendientes
                </span>
            </div>

            {/* Table / List */}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3">
                                Estudiante
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3">
                                Curso
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3">
                                Fecha / Hora
                            </th>
                            <th className="pb-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {pendingReviews.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors duration-150 group">
                                {/* Student Info with avatar circle */}
                                <td className="py-3.5 pr-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                                            {row.studentName.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <span className="font-bold text-sm text-slate-800 block">
                                                {row.studentName}
                                            </span>
                                            <span className="text-[11px] font-medium text-slate-400 block max-w-[140px] truncate">
                                                {row.taskName}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Course */}
                                <td className="py-3.5 pr-2">
                                    <span className="inline-block text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/40">
                                        {row.courseName}
                                    </span>
                                </td>

                                {/* Time */}
                                <td className="py-3.5 pr-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                        <Clock size={13} className="text-slate-400 shrink-0" />
                                        <span className={row.time.includes("Hoy") ? "text-emerald-600 font-semibold" : ""}>
                                            {row.time}
                                        </span>
                                    </div>
                                </td>

                                {/* Action */}
                                <td className="py-3.5 text-right">
                                    <button className="text-[11px] font-bold text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 bg-white hover:bg-blue-600 px-3 py-1.5 rounded-lg transition duration-200 shadow-sm flex items-center gap-1 ml-auto">
                                        <CheckCircle2 size={12} className="shrink-0" />
                                        <span className="hidden sm:inline">Calificar</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PendingReviews;
