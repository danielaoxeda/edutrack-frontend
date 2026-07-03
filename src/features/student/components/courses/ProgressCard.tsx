import {
    BookOpen,
    GraduationCap,
    ClipboardList,
    Users,
} from "lucide-react";

import type { StudentCourse } from "../../../../types/course";

interface ProgressCardProps {
    courses: StudentCourse[];
}

export default function ProgressCard({
                                         courses,
                                     }: ProgressCardProps) {

    const activeCourses = courses.length;

    const totalCredits = courses.reduce(
        (acc, course) => acc + course.creditos,
        0
    );

    const totalActivities = courses.reduce(
        (acc, course) => acc + course.actividadesPendientes,
        0
    );

    const totalTeachers = new Set(
        courses
            .map((course) => course.docente)
            .filter(Boolean)
    ).size;

    const stats = [
        {
            title: "Cursos",
            value: activeCourses,
            icon: BookOpen,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Créditos",
            value: totalCredits,
            icon: GraduationCap,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Docentes",
            value: totalTeachers,
            icon: Users,
            color: "bg-violet-50 text-violet-600",
        },
        {
            title: "Actividades",
            value: totalActivities,
            icon: ClipboardList,
            color: "bg-amber-50 text-amber-600",
        },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm h-full">

            <div className="mb-6">

                <h3 className="text-lg font-bold text-slate-800">
                    Resumen académico
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                    Información general del ciclo actual.
                </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (

                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 p-4"
                        >

                            <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}
                            >
                                <Icon size={20} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-800 mt-4">
                                {stat.value}
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                {stat.title}
                            </p>

                        </div>

                    );

                })}

            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-4">

                <p className="text-xs uppercase tracking-wide font-semibold text-blue-600">
                    Estado
                </p>

                <h4 className="font-bold text-slate-800 mt-1">
                    {activeCourses > 0
                        ? "Matrícula activa"
                        : "Sin cursos registrados"}
                </h4>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {activeCourses > 0
                        ? "Actualmente participas en cursos del periodo académico vigente."
                        : "No existen cursos asociados a tu matrícula."}
                </p>

            </div>

        </div>
    );
}