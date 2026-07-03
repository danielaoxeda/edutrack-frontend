import {
    BookOpen,
    GraduationCap,
    ClipboardList,
    CalendarDays,
    FolderOpen,
    MessageSquare,
    ClipboardCheck,
    ArrowRight,
    MoreVertical,
} from "lucide-react";

import type { StudentCourse } from "../../../../types/course";

interface Props {
    course: StudentCourse;
}

export default function CourseDetailCard({ course }: Props) {
    return (
        <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

            {/* Accent */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400" />
            <div className="p-6 flex flex-col flex-1">

                {/* Header */}

                <div className="flex items-start justify-between">
                    <div>

                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                            <BookOpen size={14} />
                            {course.codigo}
                        </span>

                    </div>

                    <button className="rounded-xl p-2 hover:bg-slate-100 transition">
                        <MoreVertical size={18} />
                    </button>

                </div>

                {/* Title */}

                <div className="mt-5">
                    <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition">
                        {course.nombre}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                        {course.descripcion}
                    </p>

                </div>

                {/* Teacher */}

                <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Docente
                    </p>

                    <h4 className="font-semibold text-slate-800 mt-1">
                        {course.docente || "Docente asignado"}

                    </h4>

                </div>

                {/* Metrics */}

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <GraduationCap size={18} />
                            <span className="text-xs font-semibold">
                                Créditos
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold mt-3 text-slate-800">
                            {course.creditos}
                        </h3>

                    </div>

                    <div className="rounded-2xl bg-amber-50 p-4">
                        <div className="flex items-center gap-2 text-amber-600">
                            <ClipboardList size={18} />
                            <span className="text-xs font-semibold">
                                Pendientes
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold mt-3 text-slate-800">
                            {course.actividadesPendientes}
                        </h3>
                    </div>
                </div>

                {/* Period */}
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50 border border-blue-100 p-4">
                    <CalendarDays
                        size={20}
                        className="text-blue-600 shrink-0"
                    />
                    <div>

                        <p className="text-xs uppercase text-blue-600 font-semibold">
                            Periodo
                        </p>

                        <p className="font-semibold text-slate-800">

                            {course.periodo}

                        </p>

                    </div>

                </div>

                {/* Actions */}

                <div className="grid grid-cols-4 gap-2 mt-6 border-t border-slate-100 pt-5">

                    <button className="flex flex-col items-center gap-1 rounded-xl py-3 hover:bg-blue-50 transition">

                        <ClipboardList
                            size={18}
                            className="text-blue-600"
                        />

                        <span className="text-[11px] font-semibold text-slate-600">

                            Actividades

                        </span>

                    </button>

                    <button className="flex flex-col items-center gap-1 rounded-xl py-3 hover:bg-blue-50 transition">
                        <FolderOpen
                            size={18}
                            className="text-blue-600"
                        />

                        <span className="text-[11px] font-semibold text-slate-600">
                            Material
                        </span>

                    </button>

                    <button className="flex flex-col items-center gap-1 rounded-xl py-3 hover:bg-blue-50 transition">
                        <MessageSquare
                            size={18}
                            className="text-blue-600"
                        />

                        <span className="text-[11px] font-semibold text-slate-600">
                            Foro

                        </span>
                    </button>

                    <button className="flex flex-col items-center gap-1 rounded-xl py-3 hover:bg-blue-50 transition">

                        <ClipboardCheck
                            size={18}
                            className="text-blue-600"
                        />

                        <span className="text-[11px] font-semibold text-slate-600">

                            Asistencia

                        </span>

                    </button>

                </div>

                {/* Footer */}

                <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition">

                    Ver detalle del curso

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>
    );

}