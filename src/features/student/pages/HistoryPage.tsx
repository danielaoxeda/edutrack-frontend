import {
    GraduationCap,
    History,
} from "lucide-react";

import StudentLayout from "../layout/StudentLayout";


import { useAcademicHistory } from "../../../hooks/useAcademicHistory";
import { useAuth } from "../../../context/AuthContext";
import AcademicStatsGrid from "../components/history/AcademicStatsGrid.tsx";
import TimelineCard from "../components/history/AcademicTimeline.tsx";
import AcademicSummaryCard from "../components/history/AcademicSummaryCard.tsx";

export default function AcademicHistoryPage() {

    const { estudianteId } = useAuth();

    const {
        summary,
        stats,
        timeline,
        loading,
        error,
    } = useAcademicHistory(estudianteId ?? undefined);

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
                            />

                        )}

                    </div>

                </div>

            </div>

        </StudentLayout>
    );
}