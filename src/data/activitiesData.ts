// Define el tipo de status una sola vez
export type ActivityStatus = "entregado" | "pendiente" | "calificado";

// Define la forma completa de una actividad
export interface Activity {
    id: number;
    title: string;
    description: string;
    date: string;
    status: ActivityStatus;
}

// Aplica el tipo al array
export const activities: Activity[] = [
    {
        id: 1,
        title: "Arquitectura de Software",
        description: "Diagramas de Componentes y Despliegue",
        date: "25 Oct, 2025",
        status: "entregado",
    },
    {
        id: 2,
        title: "Bases de Datos Avanzadas",
        description: "Optimización de Querys y Sharding",
        date: "Hoy, 18:00",
        status: "pendiente",
    },
    {
        id: 3,
        title: "Desarrollo Web Full Stack",
        description: "Implementación de Auth0 y JWT",
        date: "15 Oct, 2025",
        status: "calificado",
    },
];