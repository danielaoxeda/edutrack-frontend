import { useMemo } from "react";
import { useStudentWorkspace } from "../features/student/hooks/useStudentWorkspace";

import type {
    AcademicDashboardSummary,
    AcademicEvent,
    AcademicStats,
} from "../types/academicHistory";

export const useAcademicHistory = (_estudianteId?: number) => {
    const { workspace, loading, error } = useStudentWorkspace();

    const stats = useMemo<AcademicStats | undefined>(() => {
        if (!workspace) {
            return undefined;
        }

        return {
            entregadas: workspace.summary.deliveredActivities,
            pendientes: workspace.summary.pendingActivities,
            alertas: workspace.summary.alertsCount,
            calificadas: workspace.summary.gradedActivities,
        };
    }, [workspace]);

    const timeline = useMemo<AcademicEvent[]>(() => {
        return (workspace?.timeline ?? []).map((item) => ({
            id: item.id,
            type: item.type === "ALERTA" ? "alert" : "delivery",
            title: item.title,
            subtitle: item.courseName,
            date: item.date,
            status: item.status ?? "ALERTA",
        }));
    }, [workspace]);

    const dashboard = useMemo<AcademicDashboardSummary | null>(() => {
        if (!workspace) {
            return null;
        }

        return {
            totalEntregas: workspace.summary.deliveredActivities,
            entregasRevisadas: workspace.summary.gradedActivities,
            totalAlertas: workspace.summary.alertsCount,
            ultimaActividad: timeline[0]
                ? new Date(timeline[0].date).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                : "Sin actividad",
            estado: workspace.summary.alertsCount > 0 ? "Con alertas" : "Normal",
            promedioGeneral: workspace.summary.averageGrade ?? 0,
        };
    }, [workspace, timeline]);

    return {
        summary: dashboard,
        stats,
        timeline,
        dashboard,
        loading,
        error,
    };
};
