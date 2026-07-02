import { useEffect, useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import GradeStatsGrid from "../components/grades/GradeStatsGrid";
import GradeBookTable from "../components/grades/GradeBookTable";
import { GradeQuickActionsCard, GradeDistributionCard } from "../components/grades/GradeSidebarWidgets";
import { loadTeacherWorkspace } from "../api/teacherWorkspaceApi";
import type { GradeBookItem, StatItem } from "../data/teacherDashboardData";

function TeacherGrades() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("todos");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [grades, setGrades] = useState<GradeBookItem[]>([]);
    const [stats, setStats] = useState<StatItem[]>([]);
    const [distribution, setDistribution] = useState<Array<{ label: string; count: number; percent: number; color: string; bgBadge: string }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;

        const load = async () => {
            try {
                const workspace = await loadTeacherWorkspace();
                if (!alive) return;
                setGrades(workspace.grades.grades);
                setStats(workspace.grades.stats);
                setDistribution(workspace.grades.distribution);
                setError(null);
            } catch (err) {
                if (!alive) return;
                setError(err instanceof Error ? err.message : "No se pudo cargar las calificaciones");
            } finally {
                if (alive) setLoading(false);
            }
        };

        load();
        return () => {
            alive = false;
        };
    }, []);

    const filteredGrades = grades.filter((row) => {
        const matchesSearch =
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = courseFilter === "todos" || row.course === courseFilter;
        const matchesStatus = statusFilter === "todos" || row.status === statusFilter;
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
                        Calificaciones
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Gestiona el registro de notas, consolidados y actas de tus estudiantes.
                    </p>
                </div>

                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-sm">
                        Cargando calificaciones reales...
                    </div>
                ) : (
                    <>
                        <GradeStatsGrid stats={stats} />

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                            <div className="lg:col-span-3">
                                <GradeBookTable
                                    grades={filteredGrades}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    courseFilter={courseFilter}
                                    setCourseFilter={setCourseFilter}
                                    statusFilter={statusFilter}
                                    setStatusFilter={setStatusFilter}
                                />
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <GradeQuickActionsCard />
                                <GradeDistributionCard distribution={distribution} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </TeacherLayout>
    );
}

export default TeacherGrades;
