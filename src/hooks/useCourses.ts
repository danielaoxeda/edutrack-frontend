import { useEffect, useState } from "react";

import { matriculaService } from "../services/matriculaService";
import { courseService } from "../services/courseService";

import { toStudentCourse } from "../adapters/courseAdapter";

import type { StudentCourse } from "../types/course";

export const useCourses = (estudianteId?: number) => {
    console.log("useCourses recibió:", estudianteId);
    const [courses, setCourses] = useState<StudentCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log("ESTUDIANTE ID:", estudianteId);

    useEffect(() => {
        console.log("useEffect ejecutado");
        console.log("estudianteId =", estudianteId);
        const fetchCourses = async () => {
            console.log("Antes del if");
            if (!estudianteId) {
                console.log("No hay estudianteId");
            setCourses([]);
                return;
            }
            try {
                setLoading(true);
                setError(null);

                const matriculas = await matriculaService.getMatriculasByEstudiante(estudianteId);

                const mappedCourses = await Promise.all(

                    matriculas.map(async (matricula) => {

                        const section = await courseService.getSection(matricula.seccionId);
                        const course = await courseService.getCourse(section.cursoId);
                        const period = await courseService.getPeriod(section.periodoAcademicoId                         );

                        return toStudentCourse(
                            course,
                            section,
                            period
                        );
                    })
                );
                console.log("MATRICULAS:", matriculas);
                setCourses(mappedCourses);

            } catch (err) {

                setError(
                    err instanceof Error
                        ? err.message
                        : "Error al cargar cursos."
                );

            } finally {

                setLoading(false);
            }

        };

        fetchCourses();

    }, [estudianteId]);

    return {

        courses,
        loading,
        error

    };

};