import { Users, ChevronRight, BarChart2 } from "lucide-react";
import { coursesData } from "../../data/teacherDashboardData";

const headerStyles: Record<string, string> = {
    c1: "from-blue-600 to-indigo-800",
    c2: "from-slate-600 to-slate-800",
    c3: "from-slate-800 to-slate-950",
};

function CourseGrid() {
    return (
        <div className="mb-8">
            {/* Header section of "Mis Cursos Activos" */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BarChart2 size={18} className="text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-800">
                        Mis Cursos Activos
                    </h2>
                </div>

                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-0.5 transition duration-150">
                    <span>Ver todos</span>
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Grid of Courses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coursesData.map((course) => {
                    const gradient = headerStyles[course.id] || "from-blue-600 to-indigo-800";
                    return (
                        <div
                            key={course.id}
                            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                        >
                            {/* Course Header with Gradient */}
                            <div className={`bg-gradient-to-br ${gradient} p-6 text-white min-h-[120px] flex flex-col justify-between`}>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                                        Académico
                                    </span>
                                    <h3 className="text-lg font-bold tracking-tight leading-snug">
                                        {course.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Course Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                                {/* Group and Students Count */}
                                <div className="flex items-center justify-between text-slate-600 text-sm font-semibold border-b border-slate-100 pb-4">
                                    <span className="bg-slate-100/80 px-3 py-1 rounded-lg border border-slate-200/40">
                                        {course.group}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Users size={16} className="text-slate-400" />
                                        <span>{course.studentsCount} estudiantes</span>
                                    </div>
                                </div>

                                {/* Program Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                                        <span>Progreso Programa</span>
                                        <span className="text-slate-800 font-bold">{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/30">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Ver Curso Button */}
                                <button className="w-full text-center py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-bold rounded-xl transition duration-200 shadow-sm flex items-center justify-center gap-1.5">
                                    <span>Ver curso</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CourseGrid;
