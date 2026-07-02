import { useEffect, useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import StatsGrid from "../components/dashboard/StatsGrid";
import CourseGrid from "../components/dashboard/CourseGrid";
import PendingReviews from "../components/dashboard/PendingReviews";
import CourseAverageChart from "../components/dashboard/CourseAverageChart";
import AcademicAlerts from "../components/dashboard/AcademicAlerts";
import ClassSchedule from "../components/dashboard/ClassSchedule";
import { loadTeacherDashboard } from "../api/teacherDashboardApi";
import type {
    AcademicAlertItem,
    CourseAverageItem,
    CourseItem,
    PendingReviewItem,
    ClassScheduleItem,
    StatItem,
} from "../data/teacherDashboardData";

function TeacherDashboard() {
    const [stats, setStats] = useState<StatItem[]>([]);
    const [courses, setCourses] = useState<CourseItem[]>([]);
    const [pendingReviews, setPendingReviews] = useState<PendingReviewItem[]>([]);
    const [alerts, setAlerts] = useState<AcademicAlertItem[]>([]);
    const [schedule, setSchedule] = useState<ClassScheduleItem[]>([]);
    const [courseAverages, setCourseAverages] = useState<CourseAverageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;

        const load = async () => {
            try {
                const dashboard = await loadTeacherDashboard();

                if (!alive) return;

                setStats(dashboard.stats);
                setCourses(dashboard.courses);
                setPendingReviews(dashboard.pendingReviews);
                setAlerts(dashboard.alerts);
                setSchedule(dashboard.schedule);
                setCourseAverages(dashboard.courseAverages);
                setError(null);
            } catch (err) {
                if (!alive) return;
                setError(err instanceof Error ? err.message : "No se pudo cargar el panel docente");
            } finally {
                if (alive) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            alive = false;
        };
    }, []);

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {error}
                    </div>
                )}
                
                {loading ? (
                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-sm">
                        Cargando datos reales del panel docente...
                    </div>
                ) : (
                    <>
                        {/* 1. TOP METRICS / STATISTICS */}
                        <StatsGrid stats={stats} />

                        {/* 2. GRID OF THE CONTENT (2 Columns on large, 1 on small) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                            
                            {/* LEFT / CENTER REGIONS (2 Columns) */}
                            <div className="lg:col-span-2 space-y-6">
                                
                                {/* active courses */}
                                <CourseGrid courses={courses} />

                                {/* sub-grid for homework review table and average grades chart */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* homeworks to grade */}
                                    <PendingReviews pendingReviews={pendingReviews} />

                                    {/* course grades average chart */}
                                    <CourseAverageChart courseAverages={courseAverages} />

                                </div>

                            </div>

                            {/* RIGHT SIDEBAR REGIONS (1 Column) */}
                            <div className="lg:col-span-1 space-y-6">
                                
                                {/* academic alerts */}
                                <AcademicAlerts alerts={alerts} />

                                {/* timeline of class schedule */}
                                <ClassSchedule schedule={schedule} />

                            </div>

                        </div>
                    </>
                )}

            </div>
        </TeacherLayout>
    );
}

export default TeacherDashboard;
