import {
    CalendarDays,
    BookOpen,
    Clock3,
    CheckCircle2,
    FileText,
    ArrowRight,
    UploadCloud,
} from "lucide-react";

import type { ActivityCardProps } from "../../../../types/ui";

const statusStyles = {
    Pendiente: {
        badge: "bg-amber-100 text-amber-700",
        icon: Clock3,
    },
    Entregado: {
        badge: "bg-emerald-100 text-emerald-700",
        icon: CheckCircle2,
    },
    Calificado: {
        badge: "bg-blue-100 text-blue-700",
        icon: FileText,
    },
    Vencida: {
        badge: "bg-rose-100 text-rose-700",
        icon: Clock3,
    },
};

export default function ActivityCard({
                                         actionLabel = "Ver actividad",
                                         courseName,
                                         title,
                                         deadline,
                                         status,
                                         onAction,
                                     }: ActivityCardProps) {

    const currentStatus = statusStyles[status];
    const StatusIcon = currentStatus.icon;

    return (
        <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 transition-all duration-300">

            <div className="flex items-start justify-between gap-6">

                {/* LEFT */}

                <div className="flex gap-4 flex-1">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">

                        <BookOpen
                            size={22}
                            className="text-blue-600"
                        />

                    </div>

                    <div className="flex-1">

                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">

                            {courseName}

                        </span>

                        <h3 className="text-lg font-bold text-slate-800 mt-1 group-hover:text-blue-600 transition">

                            {title}

                        </h3>

                        <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">

                            <CalendarDays size={16} />

                            <span>{deadline}</span>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="flex flex-col items-end gap-4">

                    <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${currentStatus.badge}`}
                    >
                        <StatusIcon size={14} />
                        {status}
                    </span>

                    <button
                        type="button"
                        onClick={onAction}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                    >

                        {status === "Pendiente" || status === "Vencida" ? <UploadCloud size={16} /> : null}
                        {actionLabel}

                        <ArrowRight size={16} />

                    </button>

                </div>

            </div>

        </div>
    );
}
