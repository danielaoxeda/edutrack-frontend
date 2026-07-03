import type { StudentCourse } from "../types/course";

import type {
    CursoDTO,
    SeccionDTO,
    PeriodoDTO
} from "../services/courseService";

export const toStudentCourse = (
    course: CursoDTO,
    section: SeccionDTO,
    period: PeriodoDTO
): StudentCourse => {

    return {

        id: course.id,
        codigo: course.codigo,
        nombre: course.nombre,
        descripcion: course.descripcion,
        creditos: course.creditos,
        seccionId: section.id,
        seccion: section.nombre,
        periodo: period.nombre,
        actividadesPendientes: 0,
        docente: ""

    };

};