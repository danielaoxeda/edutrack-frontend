export interface AcademicSummary {
    periodo: string;
    entregas: number;
    pendientes: number;
    alertas: number;
    calificadas: number;

}
export interface AcademicDashboardSummary {

    totalEntregas: number;
    entregasRevisadas: number;
    totalAlertas: number;
    ultimaActividad: string;
    estado: string;
    promedioGeneral: number;
}

export interface AcademicStats {
    entregadas: number;
    pendientes: number;
    alertas: number;
    calificadas: number;

}

export interface AcademicEvent {
    id: number | string;
    type: "delivery" | "alert" | "grade" | "activity";
    title: string;
    subtitle: string;
    date: string;
    status: string;
}

export interface AcademicHistory {
    summary: AcademicSummary;
    stats: AcademicStats;
    timeline: AcademicEvent[];
}
