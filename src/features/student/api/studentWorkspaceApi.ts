import api from "../../../lib/api";
import type { ActivityCardProps } from "../../../types/ui";
import type { StudentCourse } from "../../../types/course";

export interface StudentWorkspace {
    profile: {
        estudianteId: number;
        userId: number;
        fullName: string;
        email: string;
        code: string;
        academicStatus: string;
    };
    summary: {
        activeCourses: number;
        pendingActivities: number;
        deliveredActivities: number;
        gradedActivities: number;
        averageGrade: number | null;
        attendancePercent: number | null;
        alertsCount: number;
    };
    courses: StudentWorkspaceCourse[];
    activities: StudentWorkspaceActivity[];
    alerts: StudentWorkspaceAlert[];
    timeline: StudentWorkspaceTimelineItem[];
}

export interface StudentWorkspaceCourse {
    matriculaId: number;
    courseId: number;
    sectionId: number;
    code: string;
    name: string;
    description: string;
    credits: number;
    sectionName: string;
    period: string;
    teacherName: string;
    activitiesCount: number;
    pendingActivities: number;
    averageGrade: number | null;
    attendancePercent: number | null;
    progress: number;
}

export interface StudentWorkspaceActivity {
    id: number;
    matriculaId: number;
    courseId: number;
    sectionId: number;
    courseCode: string;
    courseName: string;
    sectionName: string;
    title: string;
    description: string | null;
    type: string;
    dueDate: string;
    maxGrade: number;
    status: string;
    delivery: {
        id: number;
        status: string;
        grade: number | null;
        submittedAt: string;
        studentComment: string | null;
        teacherComment: string | null;
        fileUrl: string | null;
    } | null;
}

export interface StudentWorkspaceAlert {
    id: number;
    matriculaId: number;
    type: string;
    description: string;
    date: string;
    courseName: string;
}

export interface StudentWorkspaceTimelineItem {
    id: string;
    type: string;
    title: string;
    description: string | null;
    date: string;
    courseName: string;
    grade: number | null;
    status: string | null;
}

export async function loadStudentWorkspace() {
    const { data } = await api.get<StudentWorkspace>("/alumno/workspace");
    return data;
}

export function toStudentCourse(course: StudentWorkspaceCourse): StudentCourse {
    return {
        id: course.courseId,
        matriculaId: course.matriculaId,
        codigo: course.code,
        nombre: course.name,
        descripcion: course.description,
        creditos: course.credits,
        seccionId: course.sectionId,
        seccion: course.sectionName,
        periodo: course.period,
        actividadesPendientes: course.pendingActivities,
        docente: course.teacherName,
        progress: course.progress,
        averageGrade: course.averageGrade,
        attendancePercent: course.attendancePercent,
    };
}

export function toStudentActivityCard(activity: StudentWorkspaceActivity): ActivityCardProps {
    return {
        id: activity.id,
        courseName: activity.courseName,
        title: activity.title,
        deadline: formatDeadline(activity.dueDate),
        status: normalizeActivityStatus(activity.status),
    };
}

function normalizeActivityStatus(status: string): ActivityCardProps["status"] {
    if (status === "CALIFICADA" || status === "CALIFICADO" || status === "REVISADO") {
        return "Calificado";
    }

    if (status === "ENTREGADO" || status === "ATRASADO") {
        return "Entregado";
    }

    if (status === "VENCIDA") {
        return "Vencida";
    }

    return "Pendiente";
}

function formatDeadline(value: string) {
    const date = new Date(value);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "Hoy";
    }

    if (diffDays === 1) {
        return "Manana";
    }

    return date.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "short",
    });
}
