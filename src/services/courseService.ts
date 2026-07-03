import api from "../lib/api";

export interface CursoDTO {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    creditos: number;
}

export interface SeccionDTO {
    id: number;
    cursoId: number;
    cursoCodigo: string;
    periodoAcademicoId: number;
    periodoNombre: string;
    nombre: string;
    capacidad: number;
}

export interface PeriodoDTO {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
    numeroSemanas: number;
    estado: string;
}

export const courseService = {

    getCourse: async (id: number): Promise<CursoDTO> => {
        const response = await api.get(`/cursos/${id}`);
        return response.data;
    },

    getSection: async (id: number): Promise<SeccionDTO> => {
        console.log("Buscando sección:", id);
        const response = await api.get(`/secciones/${id}`)
        console.log("Sección:", response.data);
        return response.data;
    },

    getPeriod: async (id: number): Promise<PeriodoDTO> => {
        const response = await api.get(`/periodos/${id}`);
        return response.data;
    }

};