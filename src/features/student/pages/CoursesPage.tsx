import { BookOpen, ListTodo } from "lucide-react";
import { useMemo } from "react";

import StudentLayout from "../layout/StudentLayout";
import HeroCard from "../components/courses/HeroCard";
import ProgressCard from "../components/courses/ProgressCard";
import CourseDetailCard from "../components/courses/CourseDetailCard";
import ActivityCard from "../components/courses/ActivityCard";

import {
    toStudentActivityCard,
    toStudentCourse,
} from "../api/studentWorkspaceApi";
import { useStudentWorkspace } from "../hooks/useStudentWorkspace";

export default function CoursesPage() {
    const { workspace, loading, error } = useStudentWorkspace();

    const coursesWithStats = useMemo(() => {
        return (workspace?.courses ?? []).map(toStudentCourse);
    }, [workspace]);

    const sortedActivities = useMemo(() => {
        return [...(workspace?.activities ?? [])].sort(
            (a, b) =>
                new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime()
        );
    }, [workspace]);

    const nextActivity = sortedActivities[0];

    const activityCardPropsList = useMemo(() => {
        return sortedActivities.map(toStudentActivityCard);
    }, [sortedActivities]);

    if (error) {
        return (
            <StudentLayout>
                <div className="p-4 text-red-600">{error}</div>
            </StudentLayout>
        );
    }
    return (
        <StudentLayout>
            <div className="w-full">

                {/* HEADER */}
                <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900">
                            Mis cursos
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Consulta tus cursos, actividades y próximas clases.
                        </p>
                    </div>

                </header>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* HERO */}
                    <div className="lg:col-span-8">
                        {loading ? (
                            <div className="h-56 rounded-2xl bg-slate-200 animate-pulse" />
                        ) : (
                            <HeroCard
                                courses={coursesWithStats}
                                nextActivity={nextActivity}
                            />
                        )}
                    </div>

                    {/* RESUMEN */}
                    <div className="lg:col-span-4">
                        <ProgressCard
                            courses={coursesWithStats}
                        />
                    </div>

                    {/* CURSOS */}
                    <div className="lg:col-span-12">

                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <BookOpen className="text-blue-700" />
                            Cursos matriculados
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {loading ? (

                                Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-72 rounded-2xl bg-slate-200 animate-pulse"
                                    />
                                ))

                            ) : (

                                coursesWithStats.map((course) => (
                                    <CourseDetailCard
                                        key={course.id}
                                        course={course}
                                    />
                                ))

                            )}

                        </div>

                    </div>

                    {/* ACTIVIDADES */}
                    <div className="lg:col-span-12">

                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <ListTodo className="text-blue-700" />
                            Próximas actividades
                        </h2>

                        <div className="space-y-4">

                            {loading ? (

                                Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-24 rounded-xl bg-slate-200 animate-pulse"
                                    />
                                ))

                            ) : activityCardPropsList.length > 0 ? (

                                activityCardPropsList.map((activity) => (
                                    <ActivityCard
                                        key={activity.id}
                                        {...activity}
                                    />
                                ))

                            ) : (

                                <div className="text-center py-8 text-slate-500">
                                    No tienes actividades pendientes.
                                </div>

                            )}

                        </div>

                    </div>

                    {/* CALENDARIO
                    <div className="lg:col-span-5">
                        <CalendarCard sessions={sessions} />
                    </div>
                    */}

                </div>

            </div>
        </StudentLayout>
    );
}
