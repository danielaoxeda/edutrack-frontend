import { useEffect, useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import AttendanceStatsGrid from "../components/attendance/AttendanceStatsGrid";
import AttendanceRegisterTable from "../components/attendance/AttendanceRegisterTable";
import { AttendanceQuickActionsCard, AttendanceDistributionCard } from "../components/attendance/AttendanceSidebarWidgets";
import { loadTeacherWorkspace, saveTeacherAttendance } from "../api/teacherWorkspaceApi";
import type { AttendanceRegistryItem, StatItem } from "../data/teacherDashboardData";

function TeacherAttendance() {
    const [attendanceList, setAttendanceList] = useState<AttendanceRegistryItem[]>([]);
    const [stats, setStats] = useState<StatItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("todos");
    const [groupFilter, setGroupFilter] = useState("todos");
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        let alive = true;

        const load = async () => {
            try {
                const workspace = await loadTeacherWorkspace();
                if (!alive) return;
                setAttendanceList(workspace.attendance.attendanceList);
                setStats(workspace.attendance.stats);
                setError(null);
            } catch (err) {
                if (!alive) return;
                setError(err instanceof Error ? err.message : "No se pudo cargar la asistencia");
            } finally {
                if (alive) setLoading(false);
            }
        };

        load();
        return () => {
            alive = false;
        };
    }, []);

    const handleStatusChange = (id: string, newStatus: "presente" | "tardanza" | "falta") => {
        setAttendanceList((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, todayStatus: newStatus } : item
            )
        );
    };

    const handleSave = async () => {
        try {
            await saveTeacherAttendance(selectedDate, attendanceList);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2800);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo guardar la asistencia");
        }
    };

    const handleExport = () => {
        alert("Generando y descargando el reporte de asistencia consolidado en formato Excel/PDF...");
    };

    const filteredAttendance = attendanceList.filter((row) => {
        const matchesSearch =
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = courseFilter === "todos" || row.course === courseFilter;
        const matchesGroup = groupFilter === "todos" || row.group === groupFilter;
        return matchesSearch && matchesCourse && matchesGroup;
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
                        Control de Asistencia
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Registra la asistencia diaria, gestiona tardanzas y exporta reportes detallados del ciclo.
                    </p>
                </div>

                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500 shadow-sm">
                        Cargando asistencia real...
                    </div>
                ) : (
                    <>
                        <AttendanceStatsGrid stats={stats} />

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                            <div className="lg:col-span-3">
                                <AttendanceRegisterTable
                                    attendanceList={filteredAttendance}
                                    onStatusChange={handleStatusChange}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    courseFilter={courseFilter}
                                    setCourseFilter={setCourseFilter}
                                    groupFilter={groupFilter}
                                    setGroupFilter={setGroupFilter}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    onSave={handleSave}
                                    onExport={handleExport}
                                    showToast={showToast}
                                />
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <AttendanceQuickActionsCard />
                                <AttendanceDistributionCard stats={stats} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </TeacherLayout>
    );
}

export default TeacherAttendance;
