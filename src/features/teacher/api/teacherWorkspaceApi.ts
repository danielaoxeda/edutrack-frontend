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
import { request } from "../../../lib/http";

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
    const raw = await request<RawWorkspaceResponse>("/api/docente/workspace");

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

export async function saveTeacherAttendance(date: string, attendanceList: AttendanceRegistryItem[]): Promise<void> {
    await request<void>(`/api/docente/asistencia?date=${encodeURIComponent(date)}`, {
        method: "POST",
        body: JSON.stringify({ attendanceList }),
    });
}
