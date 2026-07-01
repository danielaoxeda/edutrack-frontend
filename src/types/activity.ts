export interface Curso {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    creditos: number;
}

export interface Seccion {
    id: number;
    nombre: string;
    curso: Curso;
}

export interface SemanaAcademica {
    id: number;
    numeroSemana: number;
    titulo: string;
    seccion: Seccion;
}

export interface CriterioEvaluacion {
    id: number;
    nombre: string;
    porcentaje: number;
    seccion: Seccion;
}

export interface Entrega {
    id: number;
    comentarioAlumno: string;
    archivoUrl: string;
    fechaEntrega: string;
    estado: 'ENTREGADO' | 'ATRASADO' | 'REVISADO';
    nota: number;
    comentarioDocente: string;
}

export interface Actividad {
    id: number;
    titulo: string;
    descripcion: string;
    tipo: 'TAREA' | 'PC' | 'PROYECTO' | 'PRACTICA' | 'EXAMEN';
    fechaLimite: string;
    calificado: boolean;
    notaMaxima: number;
    visible: boolean;
    semanaAcademica: SemanaAcademica;
    criterioEvaluacion: CriterioEvaluacion;
    entregas: Entrega[];
}

export interface SesionClase {
    id: number;
    tema: string;
    fecha: string;
    semanaAcademica: SemanaAcademica;
    asistencias: any[];
}