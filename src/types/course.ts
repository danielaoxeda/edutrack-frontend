export interface StudentCourse {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    creditos: number;
    seccionId: number;
    seccion: string;
    periodo: string;
    actividadesPendientes: number;
    docente?: string;
    nextActivityTitle?: string;
    nextActivityDate?: string;
}