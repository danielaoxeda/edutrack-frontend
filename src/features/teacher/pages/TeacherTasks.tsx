import { useEffect, useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import TaskStatsGrid from "../components/tasks/TaskStatsGrid";
import TaskTable from "../components/tasks/TaskTable";
import TaskSubPanels from "../components/tasks/TaskSubPanels";
import { TaskQuickActionsCard, UrgentTasksCard } from "../components/tasks/TaskSidebarWidgets";
import { loadTeacherWorkspace } from "../api/teacherWorkspaceApi";
import {
    createTeacherActivity,
    loadTeacherActivityOptions,
    type TeacherActivityOption,
    type TeacherActivityPayload,
} from "../api/teacherWorkspaceApi";
import CreateActivityModal from "../components/courses/CreateActivityModal";
import type { StatItem, TaskItem, RecentSubmissionItem, UrgentTaskItem } from "../data/teacherDashboardData";

function TeacherTasks() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("todos");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmissionItem[]>([]);
    const [urgentTasks, setUrgentTasks] = useState<UrgentTaskItem[]>([]);
    const [stats, setStats] = useState<StatItem[]>([]);
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
                const workspace = await loadTeacherWorkspace();
                if (!alive) return;
                setTasks(workspace.tasks.tasks);
                setRecentSubmissions(workspace.tasks.recentSubmissions);
                setUrgentTasks(workspace.tasks.urgentTasks);
                setStats(workspace.tasks.stats);
                setError(null);
            } catch (err) {
                if (!alive) return;
                setError(err instanceof Error ? err.message : "No se pudo cargar las tareas");
            } finally {
                if (alive) setLoading(false);
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
                setError("No tienes secciones asignadas para crear tareas.");
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
            const workspace = await loadTeacherWorkspace();
            setTasks(workspace.tasks.tasks);
            setRecentSubmissions(workspace.tasks.recentSubmissions);
            setUrgentTasks(workspace.tasks.urgentTasks);
            setStats(workspace.tasks.stats);
            setFeedback("Tarea publicada correctamente.");
            setActivityModalOpen(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo crear la tarea");
        } finally {
            setSavingActivity(false);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = courseFilter === "todos" || task.course === courseFilter;
        const matchesStatus = statusFilter === "todos" || task.status === statusFilter;
        return matchesSearch && matchesCourse && matchesStatus;
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

                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Tareas
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Gestiona las actividades, entregas y revisiones de tus cursos.
                    </p>
                </div>

                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-sm">
                        Cargando tareas reales...
                    </div>
                ) : (
                    <>
                        <TaskStatsGrid stats={stats} />

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                            <div className="lg:col-span-3 space-y-6">
                                <TaskTable
                                    tasks={filteredTasks}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    courseFilter={courseFilter}
                                    setCourseFilter={setCourseFilter}
                                    statusFilter={statusFilter}
                                    setStatusFilter={setStatusFilter}
                                    onCreateTask={() => void openActivityModal()}
                                    courseOptions={Array.from(new Set(tasks.map((task) => task.course))).sort()}
                                />

                                <TaskSubPanels recentSubmissions={recentSubmissions} urgentTasks={urgentTasks} />
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <TaskQuickActionsCard onCreateTask={() => void openActivityModal()} />
                                <UrgentTasksCard urgentTasks={urgentTasks} />
                            </div>
                        </div>
                    </>
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

export default TeacherTasks;
