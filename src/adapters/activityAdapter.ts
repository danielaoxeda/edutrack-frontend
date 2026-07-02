import type { Actividad } from '../types/activity';
import type {ActivityCardProps} from "../types/ui.ts";

const formatDeadline = (fechaLimite: string): string => {
    const date = new Date(fechaLimite);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let dayStr = '';
    if (diffDays === 0) dayStr = 'Hoy';
    else if (diffDays === 1) dayStr = 'Mañana';
    else if (diffDays === -1) dayStr = 'Ayer';
    else {
        // Formato: "30 Mayo"
        const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        dayStr = `${date.getDate()} ${months[date.getMonth()]}`;
    }

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${dayStr}, ${hours}:${minutes}`;
};

export const toActivityCardProps = (actividad: Actividad): ActivityCardProps => {
    // Tomar la primera entrega (si existe) para determinar el estado
    const entrega = actividad.entregas?.[0];
    let status: 'Pendiente' | 'Entregado' | 'Calificado' = 'Pendiente';

    if (entrega) {
        if (actividad.calificado) {
            status = 'Calificado';
        } else if (entrega.estado === 'ENTREGADO' || entrega.estado === 'ATRASADO') {
            status = 'Entregado';
        }
    }

    // Nombre del curso desde la sección
    const courseName = actividad.semanaAcademica?.seccion?.curso?.nombre || 'Curso sin nombre';

    return {
        id: actividad.id,
        courseName,
        title: actividad.titulo,
        deadline: formatDeadline(actividad.fechaLimite),
        status,
    };
};