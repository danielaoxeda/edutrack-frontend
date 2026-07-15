import type {
    AttendanceRegistryItem,
    GradeBookItem,
    RecentSubmissionItem,
    StudentAlertItem,
    StudentItem,
    TaskItem,
    UrgentTaskItem,
    StatItem,
} from "../data/teacherDashboardData";
import api from "../../../lib/api";
import axios from "axios";

type WorkspaceResponse = {
    students: {
        stats: StatItem[];
        students: StudentItem[];
        alerts: StudentAlertItem[];
    };
    tasks: {
        stats: StatItem[];
        tasks: TaskItem[];
        recentSubmissions: RecentSubmissionItem[];
        urgentTasks: UrgentTaskItem[];
    };
    attendance: {
        stats: StatItem[];
        attendanceList: AttendanceRegistryItem[];
    };
    grades: {
        stats: StatItem[];
        grades: Array<GradeBookItem>;
        distribution: Array<{
            label: string;
            count: number;
            percent: number;
            color: string;
            bgBadge: string;
        }>;
    };
};

type RawWorkspaceResponse = {
    students: WorkspaceResponse["students"];
    tasks: WorkspaceResponse["tasks"];
    attendance: WorkspaceResponse["attendance"];
    grades: {
        stats: StatItem[];
        grades: Array<Omit<GradeBookItem, "final"> & { finalGrade: number }>;
        distribution: WorkspaceResponse["grades"]["distribution"];
    };
};

export async function loadTeacherWorkspace(): Promise<WorkspaceResponse> {
    const {data: raw} = await api.get<RawWorkspaceResponse>("/docente/workspace");

    return {
        ...raw,
        grades: {
            stats: raw.grades.stats,
            grades: raw.grades.grades.map(({ finalGrade, ...grade }) => ({
                ...grade,
                final: finalGrade,
            })),
            distribution: raw.grades.distribution,
        },
    };
}

export async function saveTeacherAttendance(
    date: string,
    attendanceList: AttendanceRegistryItem[]
): Promise<void> {
    await api.post(
        `/docente/asistencia?date=${encodeURIComponent(date)}`,
        { attendanceList }
    );
}

export type TeacherActivityOption = {
    seccionId: number;
    cursoCodigo: string;
    cursoNombre: string;
    seccionNombre: string;
};

export type TeacherActivityPayload = {
    seccionId: number;
    numeroSemana: number;
    titulo: string;
    descripcion: string;
    tipo: "TAREA" | "PC" | "PROYECTO" | "PRACTICA" | "EXAMEN";
    fechaLimite: string;
    calificada: boolean;
    notaMaxima: number;
    visible: boolean;
};

export async function loadTeacherActivityOptions(): Promise<TeacherActivityOption[]> {
    const { data } = await api.get<TeacherActivityOption[]>("/docente/actividad-opciones");
    return data;
}

export async function createTeacherActivity(payload: TeacherActivityPayload): Promise<void> {
    await api.post("/docente/actividades", payload);
}

export async function gradeTeacherSubmission(
    deliveryId: number,
    payload: { nota: number; comentario: string }
): Promise<void> {
    try {
        await api.put(`/entregas/${deliveryId}/calificar`, payload);
    } catch (error) {
        if (axios.isAxiosError<{ mensaje?: string; error?: string; detail?: string }>(error)) {
            const message =
                error.response?.data?.mensaje ??
                error.response?.data?.error ??
                error.response?.data?.detail ??
                "No se pudo calificar la entrega";
            throw new Error(message);
        }

        throw error instanceof Error ? error : new Error("No se pudo calificar la entrega");
    }
}
