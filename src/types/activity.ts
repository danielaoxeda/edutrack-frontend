export interface Activity {
    id: number;
    titulo: string;
    descripcion?: string;
    fechaLimite: string; // ISO string o "YYYY-MM-DDTHH:mm:ss"
    estado: 'Pendiente' | 'Entregado' | 'Calificado';
    cursoNombre: string; // o cursoId para luego obtener nombre
    // Opcional: otros campos como tipo, peso, etc.
}

export interface ActivityFilters {
    fechaInicio?: string;
    fechaFin?: string;
    seccionId?: number;
    tipo?: string;
    visibles?: boolean;
}