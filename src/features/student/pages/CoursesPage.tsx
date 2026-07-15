import { BookOpen, ListTodo } from "lucide-react";
import { useMemo, useState } from "react";

import StudentLayout from "../layout/StudentLayout";
import HeroCard from "../components/courses/HeroCard";
import ProgressCard from "../components/courses/ProgressCard";
import CourseDetailCard from "../components/courses/CourseDetailCard";
import ActivityCard from "../components/courses/ActivityCard";
import ActivitySubmissionModal from "../components/courses/ActivitySubmissionModal";

import {
    submitStudentActivityDelivery,
    toStudentActivityCard,
    toStudentCourse,
    type StudentWorkspaceActivity,
} from "../api/studentWorkspaceApi";
import { useStudentWorkspace } from "../hooks/useStudentWorkspace";

export default function CoursesPage() {
    const { workspace, loading, error, refresh } = useStudentWorkspace();
    const [selectedActivity, setSelectedActivity] = useState<StudentWorkspaceActivity | null>(null);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        return sortedActivities.map((activity) => {
            const cardProps = toStudentActivityCard(activity);
            return {
                ...cardProps,
                actionLabel: activity.delivery ? "Ver entrega" : "Entregar",
                onAction: () => {
                    setSubmissionError(null);
                    setSubmissionSuccess(null);
                    setSelectedActivity(activity);
                },
            };
        });
    }, [sortedActivities]);

    const handleSubmitDelivery = async (payload: { comentarioAlumno: string; archivoUrl: string }) => {
        if (!selectedActivity) {
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmissionError(null);
            const updatedWorkspace = await submitStudentActivityDelivery(selectedActivity.id, payload)
                .then(() => refresh());
            const updatedActivity = updatedWorkspace.activities.find((activity) => activity.id === selectedActivity.id);

            if (updatedActivity) {
                setSelectedActivity(updatedActivity);
            }

            setSubmissionSuccess("Entrega enviada correctamente. Tu docente ya puede revisarla.");
            window.setTimeout(() => setSubmissionSuccess(null), 4000);
        } catch (err) {
            setSubmissionError(err instanceof Error ? err.message : "No se pudo enviar la actividad");
        } finally {
            setIsSubmitting(false);
        }
    };

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

                {submissionSuccess && (
                    <div className="fixed bottom-6 right-6 z-40 max-w-sm rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-lg">
                        {submissionSuccess}
                    </div>
                )}

                <ActivitySubmissionModal
                    activity={selectedActivity}
                    isSubmitting={isSubmitting}
                    error={submissionError}
                    onClose={() => {
                        setSelectedActivity(null);
                        setSubmissionError(null);
                    }}
                    onSubmit={handleSubmitDelivery}
                />

            </div>
        </StudentLayout>
    );
}
