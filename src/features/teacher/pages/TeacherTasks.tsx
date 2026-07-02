import { useEffect, useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import TaskStatsGrid from "../components/tasks/TaskStatsGrid";
import TaskTable from "../components/tasks/TaskTable";
import TaskSubPanels from "../components/tasks/TaskSubPanels";
import { TaskQuickActionsCard, UrgentTasksCard } from "../components/tasks/TaskSidebarWidgets";
import { loadTeacherWorkspace } from "../api/teacherWorkspaceApi";
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
                                />

                                <TaskSubPanels recentSubmissions={recentSubmissions} urgentTasks={urgentTasks} />
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <TaskQuickActionsCard />
                                <UrgentTasksCard urgentTasks={urgentTasks} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </TeacherLayout>
    );
}

export default TeacherTasks;
