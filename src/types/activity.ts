export interface Curso {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    creditos: number;
}

export interface PeriodoAcademico {
    id: number;
    nombre: string;
    fechaInicio: string; // "2026-07-01"
    fechaFin: string;
    numeroSemanas: number;
    estado: 'ACTIVO' | 'INACTIVO' | 'FINALIZADO';
}

export interface Seccion {
    id: number;
    curso: Curso;
    periodoAcademico: PeriodoAcademico;
    nombre: string;
    capacidad: number;
}

export interface SemanaAcademica {
    id: number;
    seccion: Seccion;
    numeroSemana: number;
    titulo: string;
}

export interface CriterioEvaluacion {
    id: number;
    seccion: Seccion;
    nombre: string;
    porcentaje: number;
}

export interface Entrega {
    id: number;
    actividad?: Actividad;
    matricula: any;
    comentarioAlumno?: string;
    archivoUrl?: string;
    fechaEntrega: string;
    estado: 'ENTREGADO' | 'ATRASADO' | 'REVISADO' | 'PENDIENTE';
    nota: number;
    comentarioDocente?: string;
    subsanaciones?: any[];
}

export interface Actividad {
    id: number;
    semanaAcademica: SemanaAcademica;
    criterioEvaluacion?: CriterioEvaluacion;
    titulo: string;
    descripcion?: string;
    tipo: 'TAREA' | 'PC' | 'PROYECTO' | 'PRACTICA' | 'EXAMEN';
    fechaLimite: string;
    calificado: boolean;
    notaMaxima: number;
    visible: boolean;
    entregas: Entrega[];
}

export interface SesionClase {
    id: number;
    semanaAcademica: SemanaAcademica | string;
    tema: string;
    fecha: string; // "2026-07-01"
    asistencias: any[];
}

export interface Matricula {
    id: number;
    estudiante: any;
    seccion: Seccion;
    fechaMatricula: string;
    estado: 'ACTIVO' | 'INACTIVO' | 'RETIRADO';
    entregas?: Entrega[];
    asistencias?: any[];
    alertasAcademicas?: any[];
}