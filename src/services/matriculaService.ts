import api from "../lib/api.ts";

import type { Matricula } from '../types/activity';

export const matriculaService = {
    // Obtiene las matrículas de un estudiante por su ID
    getMatriculasByEstudiante:
        async (estudianteId: number): Promise<Matricula[]> => {
            console.log("Buscando matrículas del estudiante:", estudianteId);
        const response = await api.get('/matriculas', {

            params: { estudianteId }
        })
            console.log("Respuesta matrículas:", response.data);
        return response.data;
    }
};