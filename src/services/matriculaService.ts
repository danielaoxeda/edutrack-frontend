import api from "../lib/api.ts";

import type { Matricula } from '../types/activity';

export const matriculaService = {
    // Obtiene las matrículas de un estudiante por su ID
    getMatriculasByEstudiante: async (estudianteId: number): Promise<Matricula[]> => {

        const response = await api.get('/matriculas', {
            params: { estudianteId }
        });
        return response.data;
    }
};