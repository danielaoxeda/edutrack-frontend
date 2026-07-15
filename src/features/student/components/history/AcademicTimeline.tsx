import {
    AlertTriangle,
    CalendarDays,
    CheckCircle2,
    ClipboardList,
    Clock3,
    FileText,
} from "lucide-react";

import type { AcademicEvent } from "../../../../types/academicHistory";

interface Props {
    events: AcademicEvent[];
}

export default function TimelineCard({ events }: Props) {
    if (events.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                <CalendarDays
                    size={42}
                    className="mx-auto text-slate-300 mb-4"
                />

                <h3 className="font-bold text-slate-700">
                    Sin movimientos académicos
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                    Cuando tengas actividades, entregas o alertas, aparecerán aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-xl font-bold text-slate-900">
                    Historial reciente
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Actividades pendientes, entregas, revisiones y alertas académicas.
                </p>
            </div>

            <div className="divide-y divide-slate-100">
                {events.map((event) => {
                    const isAlert = event.type === "alert";
                    const isActivity = event.type === "activity";

                    return (
                        <div
                            key={`${event.type}-${event.id}`}
                            className="flex gap-4 px-6 py-5 hover:bg-slate-50 transition"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                    isAlert
                                        ? "bg-red-100 text-red-600"
                                        : isActivity
                                          ? "bg-amber-100 text-amber-600"
                                          : "bg-blue-100 text-blue-600"
                                }`}
                            >
                                {isAlert ? (
                                    <AlertTriangle size={22} />
                                ) : isActivity ? (
                                    <ClipboardList size={22} />
                                ) : (
                                    <FileText size={22} />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-bold text-slate-800">
                                            {event.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">
                                            {event.subtitle}
                                        </p>
                                    </div>

                                    <span className="text-xs text-slate-400 whitespace-nowrap">
                                        {new Date(event.date).toLocaleDateString(
                                            "es-PE",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </span>
                                </div>

                                {!isAlert && (
                                    <div className="flex items-center gap-2 mt-3">
                                        {event.status === "ENTREGADO" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 font-semibold">
                                                <CheckCircle2 size={14} />
                                                Entregado
                                            </span>
                                        )}

                                        {event.status === "REVISADO" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-semibold">
                                                <CheckCircle2 size={14} />
                                                Revisado
                                            </span>
                                        )}

                                        {event.status === "ATRASADO" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 font-semibold">
                                                <Clock3 size={14} />
                                                Atrasado
                                            </span>
                                        )}

                                        {event.status === "PENDIENTE" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700 font-semibold">
                                                <Clock3 size={14} />
                                                Pendiente
                                            </span>
                                        )}

                                        {event.status === "VENCIDA" && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 font-semibold">
                                                <Clock3 size={14} />
                                                Vencida
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
