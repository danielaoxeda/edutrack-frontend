export interface ActivityCardProps {
    id: number;
    courseName: string;        // nombre del curso
    title: string;             // título de la actividad
    deadline: string;          // fecha límite formateada
    status: 'Pendiente' | 'Entregado' | 'Calificado'; // estado de la entrega
    // ... otros campos
}