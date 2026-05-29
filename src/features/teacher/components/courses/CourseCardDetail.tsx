import { Users, Calendar, Eye, Star, ClipboardCheck, FolderOpen, MoreVertical } from "lucide-react";
import type { CourseItem } from "../../data/teacherDashboardData";

interface Props {
    course: CourseItem;
}

function CourseCardDetail({ course }: Props) {
    const isActivo = course.status === "activo";
    const statusText = isActivo ? "ACTIVO" : "EN PROGRESO";
    const statusClass = isActivo
        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
        : "bg-blue-50 text-blue-700 border-blue-100";

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative group">
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-blue-600 group-hover:bg-blue-700 transition-colors" />

            {/* Content Container */}
            <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                
                {/* Header Row (Status & Options) */}
                <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${statusClass}`}>
                        {statusText}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition shrink-0">
                        <MoreVertical size={16} />
                    </button>
                </div>

                {/* Course Title & Code */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                        {course.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400 block mt-1 uppercase">
                        {course.code} • {course.group}
                    </span>
                </div>

                {/* Metrics: Students & Average */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-1.5">
                        <Users size={15} className="text-slate-400" />
                        <span>{course.studentsCount} Estudiantes</span>
                    </div>
                    <div>
                        <span>Promedio: <span className="font-extrabold text-slate-800">{course.averageGrade}</span>/5.0</span>
                    </div>
                </div>

                {/* Syllabus Progress */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400">
                        <span>Progreso del syllabus</span>
                        <span className="text-slate-800 font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/20">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                </div>

                {/* Next Class box */}
                <div className="bg-slate-50/80 border border-slate-200/40 rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-600 font-semibold shadow-sm/5">
                    <Calendar size={15} className="text-blue-500 shrink-0" />
                    <span>Próx: {course.nextClass}</span>
                </div>

                {/* Bottom stacked 4-button action row */}
                <div className="grid grid-cols-4 border-t border-slate-100 mt-2 pt-3 gap-1">
                    {/* Detalles */}
                    <button className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all duration-200 group/btn">
                        <Eye size={16} className="text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold text-slate-500 group-hover/btn:text-blue-600 tracking-tight">
                            Detalles
                        </span>
                    </button>

                    {/* Notas */}
                    <button className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all duration-200 group/btn">
                        <Star size={16} className="text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold text-slate-500 group-hover/btn:text-blue-600 tracking-tight">
                            Notas
                        </span>
                    </button>

                    {/* Asistencia */}
                    <button className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all duration-200 group/btn">
                        <ClipboardCheck size={16} className="text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold text-slate-500 group-hover/btn:text-blue-600 tracking-tight">
                            Asistencia
                        </span>
                    </button>

                    {/* Material */}
                    <button className="flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all duration-200 group/btn">
                        <FolderOpen size={16} className="text-slate-400 group-hover/btn:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold text-slate-500 group-hover/btn:text-blue-600 tracking-tight">
                            Material
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CourseCardDetail;
