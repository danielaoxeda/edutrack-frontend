import { useEffect, useState } from "react";
import { matriculaService } from "../services/matriculaService";
import { historyService } from "../services/historyService";
import {
    createAcademicSummary,
    createAcademicStats,
    createTimeline,
    createAcademicDashboardSummary
} from "../adapters/historyAdapter";

import type {
    AcademicHistory,
    AcademicDashboardSummary
} from "../types/academicHistory";

export const useAcademicHistory = (estudianteId?: number) => {

    const [history, setHistory] = useState<AcademicHistory | null>(null);
    const [dashboard, setDashboard] = useState<AcademicDashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!estudianteId) return;

        const load = async () => {

            try {

                setLoading(true);

                const matriculas =
                    await matriculaService.getMatriculasByEstudiante(estudianteId);

                if (!matriculas.length) {
                    throw new Error("El estudiante no tiene matrícula.");
                }

                const matricula = matriculas[0];

                const [entregas, alertas] = await Promise.all([
                    historyService.getDeliveriesByMatricula(matricula.id),
                    historyService.getAlertsByMatricula(matricula.id)
                ]);

                const summary = createAcademicSummary(
                    "Periodo Actual",
                    entregas,
                    alertas
                );

                const stats = createAcademicStats(summary);

                const timeline = createTimeline(entregas, alertas);

                const dashboard = createAcademicDashboardSummary(
                    entregas,
                    alertas
                );

                setHistory({
                    summary,
                    stats,
                    timeline
                });

                setDashboard(dashboard);

            } catch (err) {

                setError(
                    err instanceof Error
                        ? err.message
                        : "Error cargando historial"
                );

            } finally {

                setLoading(false);
            }
        };

        load();
    }, [estudianteId]);

    return {
        summary: dashboard,
        stats: history?.stats,
        timeline: history?.timeline ?? [],
        dashboard,
        loading,
        error
    };
};