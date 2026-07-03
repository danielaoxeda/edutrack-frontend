import { useEffect, useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import TeacherLayout from "../components/layout/TeacherLayout";
import CoursesFilter from "../components/courses/CoursesFilter";
import CourseCardDetail from "../components/courses/CourseCardDetail";
import QuickActionsCard from "../components/courses/QuickActionsCard";
import UpcomingClassesCard from "../components/courses/UpcomingClassesCard";
import AlertsAndPendingCard from "../components/courses/AlertsAndPendingCard";
import CreateActivityModal from "../components/courses/CreateActivityModal";
import { loadTeacherDashboard } from "../api/teacherDashboardApi";
import {
    createTeacherActivity,
    loadTeacherActivityOptions,
    type TeacherActivityOption,
    type TeacherActivityPayload,
} from "../api/teacherWorkspaceApi";
import type {
    AcademicAlertItem,
    ClassScheduleItem,
    CourseItem,
    PendingReviewItem,
} from "../data/teacherDashboardData";

function TeacherCourses() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [courses, setCourses] = useState<CourseItem[]>([]);
    const [schedule, setSchedule] = useState<ClassScheduleItem[]>([]);
    const [alerts, setAlerts] = useState<AcademicAlertItem[]>([]);
    const [pendingReviews, setPendingReviews] = useState<PendingReviewItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [activityModalOpen, setActivityModalOpen] = useState(false);
    const [activityOptions, setActivityOptions] = useState<TeacherActivityOption[]>([]);
    const [savingActivity, setSavingActivity] = useState(false);

    useEffect(() => {
        let alive = true;

        const load = async () => {
            try {
                const dashboard = await loadTeacherDashboard();

                if (!alive) return;

                setCourses(dashboard.courses);
                setSchedule(dashboard.schedule);
                setAlerts(dashboard.alerts);
                setPendingReviews(dashboard.pendingReviews);
                setError(null);
            } catch (err) {
                if (!alive) return;
                setError(err instanceof Error ? err.message : "No se pudo cargar los cursos");
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

    const openActivityModal = async () => {
        setError(null);
        try {
            const options = await loadTeacherActivityOptions();
            if (options.length === 0) {
                setError("No tienes secciones asignadas para crear actividades.");
                return;
            }
            setActivityOptions(options);
            setActivityModalOpen(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudieron cargar tus secciones");
        }
    };

    const handleCreateActivity = async (payload: TeacherActivityPayload) => {
        setSavingActivity(true);
        setError(null);
        try {
            await createTeacherActivity(payload);
            const dashboard = await loadTeacherDashboard();
            setCourses(dashboard.courses);
            setSchedule(dashboard.schedule);
            setAlerts(dashboard.alerts);
            setPendingReviews(dashboard.pendingReviews);
            setFeedback("Actividad publicada correctamente.");
            setActivityModalOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo crear la actividad");
        } finally {
            setSavingActivity(false);
        }
    };

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "todos" || course.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {error}
                    </div>
                )}
                {feedback && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {feedback}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Mis Cursos
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Gestiona tus cursos asignados y el progreso de tus estudiantes.
                        </p>
                    </div>

                    <button type="button" onClick={() => void openActivityModal()} className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 hover:border-emerald-500 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm text-sm shrink-0 self-start sm:self-auto group">
                        <Plus size={16} className="text-white group-hover:scale-110 transition-transform duration-200" />
                        <span>Crear actividad</span>
                    </button>
                </div>

                <CoursesFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-sm">
                        Cargando cursos reales...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredCourses.map((course) => (
                                        <CourseCardDetail key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3 shadow-sm min-h-[300px]">
                                    <div className="p-4 bg-slate-50 text-slate-400 border border-slate-200/50 rounded-2xl">
                                        <BookOpen size={36} className="stroke-[1.5]" />
                                    </div>
                                    <h3 className="text-base font-bold text-slate-800">
                                        No se encontraron cursos
                                    </h3>
                                    <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed">
                                        Prueba a modificar la busqueda o a cambiar los filtros para ver tus asignaturas.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                            <QuickActionsCard />
                            <UpcomingClassesCard schedule={schedule} />
                            <AlertsAndPendingCard
                                alerts={alerts}
                                pendingReviews={pendingReviews}
                            />
                        </div>
                    </div>
                )}

                {activityModalOpen && (
                    <CreateActivityModal
                        options={activityOptions}
                        saving={savingActivity}
                        error={error}
                        onClose={() => setActivityModalOpen(false)}
                        onSubmit={handleCreateActivity}
                    />
                )}
            </div>
        </TeacherLayout>
    );
}

export default TeacherCourses;
