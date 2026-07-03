import { useEffect, useState } from "react";
import { studentService } from "../services/studentService";

export const useStudentDashboard = () => {

    const [courses, setCourses] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const load = async () => {

            try {

                setLoading(true);

                const [coursesData, assignmentsData] = await Promise.all([
                    studentService.getCourses(),
                    studentService.getAssignments()
                ]);

                const mappedCourses = coursesData.map((c: any) => ({
                    id: c.id,
                    title: c.nombre,
                    professor: c.docente,
                    progress: c.progreso ?? 0,
                    color: "bg-blue-500"
                }));

                const mappedAssignments = assignmentsData.map((a: any) => ({
                    id: a.id,
                    title: a.titulo,
                    subject: a.tipo,
                    date: a.fechaLimite
                        ? new Date(a.fechaLimite).toLocaleDateString()
                        : "",
                    priority: a.prioridad ?? "Media"
                }));

                setCourses(mappedCourses);
                setAssignments(mappedAssignments);

            } catch (err) {

                setError(err instanceof Error ? err.message : "Error dashboard");

            } finally {

                setLoading(false);
            }
        };

        load();

    }, []);

    return {
        courses,
        assignments,
        loading,
        error
    };
};