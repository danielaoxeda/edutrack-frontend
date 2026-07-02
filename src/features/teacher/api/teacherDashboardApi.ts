import type {
    AcademicAlertItem,
    CourseAverageItem,
    CourseItem,
    PendingReviewItem,
    ClassScheduleItem,
    StatItem,
} from "../data/teacherDashboardData";
import api from "../../../lib/api";

type TeacherDashboardResponse = {
    stats: StatItem[];
    courses: CourseItem[];
    pendingReviews: PendingReviewItem[];
    alerts: AcademicAlertItem[];
    schedule: ClassScheduleItem[];
    courseAverages: CourseAverageItem[];
};

export async function loadTeacherDashboard(): Promise<TeacherDashboardResponse> {
    const { data } = await api.get<TeacherDashboardResponse>("/docente/dashboard");
    return data;
}