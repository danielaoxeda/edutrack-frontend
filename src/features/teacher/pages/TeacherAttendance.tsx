import { useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import AttendanceStatsGrid from "../components/attendance/AttendanceStatsGrid";
import AttendanceRegisterTable from "../components/attendance/AttendanceRegisterTable";
import { AttendanceQuickActionsCard, AttendanceDistributionCard } from "../components/attendance/AttendanceSidebarWidgets";
import { attendanceRegistryData } from "../data/teacherDashboardData";
import type { AttendanceRegistryItem } from "../data/teacherDashboardData";

function TeacherAttendance() {
    // Attendance record state
    const [attendanceList, setAttendanceList] = useState<AttendanceRegistryItem[]>(attendanceRegistryData);
    
    // Filters and Date state
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("todos");
    const [groupFilter, setGroupFilter] = useState("todos");
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    });
    
    // Toast notification state
    const [showToast, setShowToast] = useState(false);

    // Dynamic state update when a toggle P/T/F button is clicked
    const handleStatusChange = (id: string, newStatus: "presente" | "tardanza" | "falta") => {
        setAttendanceList(prevList =>
            prevList.map(item =>
                item.id === id ? { ...item, todayStatus: newStatus } : item
            )
        );
    };

    // Save attendance callback
    const handleSave = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3500);
    };

    // Export report callback
    const handleExport = () => {
        alert("Generando y descargando el reporte de asistencia consolidado en formato Excel/PDF...");
    };

    // Real-time filtering logic
    const filteredAttendance = attendanceList.filter((row) => {
        const matchesSearch =
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse =
            courseFilter === "todos" || row.course === courseFilter;
        const matchesGroup =
            groupFilter === "todos" || row.group === groupFilter;

        return matchesSearch && matchesCourse && matchesGroup;
    });

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                
                {/* 1. CABECERA */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Control de Asistencia
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Registra la asistencia diaria, gestiona tardanzas y exporta reportes detallados del ciclo.
                    </p>
                </div>

                {/* 2. STATS ROW */}
                <AttendanceStatsGrid />

                {/* 3. RESPONSIVE 4-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    
                    {/* LEFT / CENTER REGIONS (3 Columns): Interactive Table */}
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

                    {/* RIGHT SIDEBAR REGIONS (1 Column): Widgets */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Quick Action Shortcuts */}
                        <AttendanceQuickActionsCard />

                        {/* Daily Attendance Distribution Horizontal Chart */}
                        <AttendanceDistributionCard />

                    </div>

                </div>

            </div>
        </TeacherLayout>
    );
}

export default TeacherAttendance;
