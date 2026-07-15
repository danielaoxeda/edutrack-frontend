import { useMemo } from "react";
import {
    toStudentActivityCard,
} from "../features/student/api/studentWorkspaceApi";
import { useStudentWorkspace } from "../features/student/hooks/useStudentWorkspace";

export const useStudentDashboard = () => {
    const { workspace, loading, error } = useStudentWorkspace();

    const courses = useMemo(() => {
        return (workspace?.courses ?? []).map((course) => ({
            id: course.courseId,
            title: course.name,
            professor: course.teacherName,
            progress: course.progress,
            color: "bg-blue-500",
        }));
    }, [workspace]);

    const assignments = useMemo(() => {
        return (workspace?.activities ?? [])
            .filter((activity) => activity.status === "PENDIENTE" || activity.status === "VENCIDA")
            .slice(0, 5)
            .map((activity) => {
                const card = toStudentActivityCard(activity);
                return {
                    id: card.id,
                    title: card.title,
                    subject: activity.courseName,
                    date: card.deadline,
                    priority: card.status,
                };
            });
    }, [workspace]);

    return {
        summary: workspace?.summary,
        courses,
        assignments,
        loading,
        error
    };
};
