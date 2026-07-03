import {
    BookOpen,
    CalendarDays,
    Clock3,
    ArrowRight,
} from "lucide-react";

import type { StudentCourse } from "../../../../types/course";
import type { Actividad } from "../../../../types/activity";

interface HeroCardProps {
    courses: StudentCourse[];
    nextActivity?: Actividad;
}

export default function HeroCard({
                                     courses,
                                     nextActivity,
                                 }: HeroCardProps) {

    const period =
        courses.length > 0
            ? courses[0].periodo
            : "Sin período";

    const totalActivities = courses.reduce(
        (acc, course) => acc + course.actividadesPendientes,
        0
    );

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 p-8 text-white shadow-xl">

            {/* Decorative circles */}
            <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10" />
            <div className="absolute right-20 bottom-0 h-28 w-28 rounded-full bg-white/5" />

            <div className="relative z-10">

                {/* Header */}
                <div className="flex items-start justify-between">

                    <div>

                        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase">

                            <BookOpen size={14} />

                            Cursos Activos

                        </span>

                        <h2 className="mt-5 text-4xl font-bold leading-tight">
                            {courses.length} Cursos matriculados
                        </h2>

                        <p className="mt-2 text-blue-100 text-lg">
                            Periodo académico {period}
                        </p>

                    </div>

                    <div className="rounded-2xl bg-white/15 px-6 py-5 backdrop-blur">

                        <p className="text-xs uppercase tracking-wide text-blue-100">
                            Actividades
                        </p>

                        <h3 className="mt-1 text-4xl font-black">
                            {totalActivities}
                        </h3>

                        <p className="text-sm text-blue-100">
                            pendientes
                        </p>

                    </div>

                </div>

                {/* Bottom section */}

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-white/10 backdrop-blur p-5">

                        <div className="flex items-center gap-2 text-blue-100 text-sm font-medium">

                            <CalendarDays size={18} />

                            Próxima actividad

                        </div>

                        {nextActivity ? (

                            <>

                                <h3 className="mt-3 text-xl font-bold">

                                    {nextActivity.titulo}

                                </h3>

                                <p className="mt-1 text-blue-100">

                                    {nextActivity.semanaAcademica?.seccion?.curso?.nombre ??
                                        "Curso"}

                                </p>

                                <div className="mt-4 flex items-center gap-2 text-sm">

                                    <Clock3 size={16} />

                                    {new Date(
                                        nextActivity.fechaLimite
                                    ).toLocaleDateString("es-PE", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}

                                </div>

                            </>

                        ) : (

                            <p className="mt-4 text-blue-100">
                                No tienes actividades próximas.
                            </p>

                        )}

                    </div>

                    <div className="rounded-2xl bg-white/10 backdrop-blur p-5 flex flex-col justify-between">

                        <div>

                            <p className="text-blue-100 text-sm">

                                Mantente al día con tus cursos y revisa constantemente tus actividades y materiales publicados por tus docentes.

                            </p>

                        </div>

                        <button className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-slate-100">

                            Ver mis cursos

                            <ArrowRight size={18} />

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}