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
        title: "Diseño de Productos y Servicios",
        description: "Avance de portafolio 3",
        date: "30 Mayo, 23:59",
        status: "entregado",
    },
    {
        id: 2,
        title: "Lenguajes de Programación",
        description: "Práctica Calificada 2",
        date: "Hoy, 10:00",
        status: "calificado",
    },
    {
        id: 3,
        title: "Herramientas de desarrollo",
        description: "Avance de proyecto 2",
        date: "02 Junio, 23:59",
        status: "pendiente",
    },
];