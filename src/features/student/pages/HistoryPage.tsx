import {
    GraduationCap,
    History,
} from "lucide-react";
import { useState } from "react";

import StudentLayout from "../layout/StudentLayout";


import { useAcademicHistory } from "../../../hooks/useAcademicHistory";
import { useAuth } from "../../../context/AuthContext";
import AcademicStatsGrid from "../components/history/AcademicStatsGrid.tsx";
import TimelineCard from "../components/history/AcademicTimeline.tsx";
import AcademicSummaryCard from "../components/history/AcademicSummaryCard.tsx";
import ActivitySubmissionModal from "../components/courses/ActivitySubmissionModal.tsx";
import {
    submitStudentActivityDelivery,
    type StudentWorkspaceActivity,
} from "../api/studentWorkspaceApi.ts";

export default function AcademicHistoryPage() {

    const { estudianteId } = useAuth();
    const [selectedActivity, setSelectedActivity] = useState<StudentWorkspaceActivity | null>(null);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        summary,
        stats,
        timeline,
        activities,
        refresh,
        loading,
        error,
    } = useAcademicHistory(estudianteId ?? undefined);

    const openActivityModal = (activityId: number) => {
        const activity = activities.find((item) => item.id === activityId);

        if (!activity) {
            setSubmissionError("No se encontro la actividad seleccionada. Actualiza la pagina e intenta de nuevo.");
            return;
        }

        setSubmissionError(null);
        setSubmissionSuccess(null);
        setSelectedActivity(activity);
    };

    const handleSubmitDelivery = async (payload: { comentarioAlumno: string; archivoUrl: string }) => {
        if (!selectedActivity) {
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmissionError(null);
            await submitStudentActivityDelivery(selectedActivity.id, payload);
            await refresh();
            setSelectedActivity(null);
            setSubmissionSuccess("Entrega enviada correctamente. Tu historial ya fue actualizado.");
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
                <div className="p-4 text-red-600">
                    {error}
                </div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>

            <div className="w-full">

                {/* HEADER */}

                <header className="mb-10">

                    <h1 className="flex items-center gap-3 text-4xl font-extrabold text-slate-900">

                        <GraduationCap
                            className="text-blue-700"
                            size={38}
                        />

                        Historial académico

                    </h1>

                    <p className="mt-3 text-slate-500">

                        Consulta tus entregas, revisiones, alertas y el
                        seguimiento de tu desempeño académico.

                    </p>

                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* HERO */}

                    <div className="lg:col-span-12">

                        {loading ? (

                            <div className="h-64 rounded-3xl bg-slate-200 animate-pulse" />

                        ) : (
                            summary && (

                            <AcademicSummaryCard
                                summary={summary}
                            />
                            )
                        )}

                    </div>

                    {/* STATS */}

                    <div className="lg:col-span-12">

                        {loading ? (

                            <div className="grid grid-cols-4 gap-6">

                                {Array.from({ length: 4 }).map((_, index) => (

                                    <div
                                        key={index}
                                        className="h-36 rounded-2xl bg-slate-200 animate-pulse"
                                    />

                                ))}

                            </div>

                        ) : (
                            stats && (

                            <AcademicStatsGrid
                                stats={stats}
                            />
                            )
                        )}

                    </div>

                    {/* TIMELINE */}

                    <div className="lg:col-span-12">

                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">

                            <History
                                className="text-blue-700"
                            />

                            Línea de tiempo

                        </h2>

                        {loading ? (

                            <div className="space-y-4">

                                {Array.from({ length: 5 }).map((_, index) => (

                                    <div
                                        key={index}
                                        className="h-24 rounded-2xl bg-slate-200 animate-pulse"
                                    />

                                ))}

                            </div>

                        ) : (

                            <TimelineCard
                                events={timeline}
                                onActivityAction={openActivityModal}
                            />

                        )}

                    </div>

                </div>

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

        </StudentLayout>
    );
}
