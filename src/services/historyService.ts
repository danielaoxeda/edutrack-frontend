import api from "../lib/api";

import type {Entrega} from "../types/activity";
import type {AlertaAcademica} from "../types/alert";

export const historyService = {
    async getDeliveriesByMatricula(matriculaId:number){
        const {data} = await api.get<Entrega[]>(
            `/entregas/matricula/${matriculaId}`
        );
        return data;

    },

    async getAlertsByMatricula(matriculaId:number){
        const {data} = await api.get<AlertaAcademica[]>(
            `/alertas/matricula/${matriculaId}`
        );
        return data;
    }
}