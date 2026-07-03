import {
    GraduationCap,
    BookOpen,
    AlertTriangle,
    ClipboardCheck,
    CalendarDays,
} from "lucide-react";

import type {AcademicDashboardSummary} from "../../../../types/academicHistory";

interface Props {
    summary: AcademicDashboardSummary;
}

export default function AcademicSummaryCard({ summary }: Props) {
    return (
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">

            {/* Background decoration */}
            <div className="absolute -right-8 -top-8 w-44 h-44 bg-white/10 rounded-full" />
            <div className="absolute right-24 bottom-0 w-24 h-24 bg-white/5 rounded-full" />

            <div className="relative z-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">

                    <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                        <GraduationCap size={28} />
                    </div>

                    <div>
                        <p className="uppercase text-xs tracking-widest font-semibold text-blue-100">
                            Historial Académico
                        </p>

                        <h1 className="text-3xl font-extrabold">
                            Resumen del estudiante
                        </h1>
                    </div>

                </div>

                {/* Main stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">

                        <div className="flex items-center gap-2 mb-2">

                            <BookOpen size={18} />

                            <span className="text-sm font-medium">
                                Entregas
                            </span>

                        </div>

                        <p className="text-3xl font-bold">
                            {summary.totalEntregas}
                        </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">

                        <div className="flex items-center gap-2 mb-2">

                            <ClipboardCheck size={18} />

                            <span className="text-sm font-medium">
                                Revisadas
                            </span>

                        </div>

                        <p className="text-3xl font-bold">
                            {summary.entregasRevisadas}
                        </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">

                        <div className="flex items-center gap-2 mb-2">

                            <AlertTriangle size={18} />

                            <span className="text-sm font-medium">
                                Alertas
                            </span>

                        </div>

                        <p className="text-3xl font-bold">
                            {summary.totalAlertas}
                        </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">

                        <div className="flex items-center gap-2 mb-2">

                            <CalendarDays size={18} />

                            <span className="text-sm font-medium">
                                Última actividad
                            </span>

                        </div>

                        <p className="text-sm font-semibold leading-snug">
                            {summary.ultimaActividad}
                        </p>

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-5">

                    <div>

                        <p className="text-sm text-blue-100">
                            Estado académico actual
                        </p>

                        <p className="font-bold text-lg">
                            {summary.estado}
                        </p>

                    </div>

                    <div className="px-4 py-2 rounded-full bg-emerald-400 text-slate-900 font-bold text-sm shadow">

                        {summary.promedioGeneral.toFixed(1)} Promedio

                    </div>

                </div>

            </div>

        </div>
    );
}