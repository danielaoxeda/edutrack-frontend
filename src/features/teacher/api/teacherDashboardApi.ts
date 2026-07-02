import type {
    AcademicAlertItem,
    CourseAverageItem,
    CourseItem,
    PendingReviewItem,
    ClassScheduleItem,
    StatItem,
} from "../data/teacherDashboardData";
import { request } from "../../../lib/http";

type TeacherDashboardResponse = {
    stats: StatItem[];
    courses: CourseItem[];
    pendingReviews: PendingReviewItem[];
    alerts: AcademicAlertItem[];
    schedule: ClassScheduleItem[];
    courseAverages: CourseAverageItem[];
};

export async function loadTeacherDashboard(): Promise<TeacherDashboardResponse> {
    return request<TeacherDashboardResponse>("/api/docente/dashboard");
}
