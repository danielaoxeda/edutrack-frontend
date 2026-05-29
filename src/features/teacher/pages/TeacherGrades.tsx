import { useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import GradeStatsGrid from "../components/grades/GradeStatsGrid";
import GradeBookTable from "../components/grades/GradeBookTable";
import { GradeQuickActionsCard, GradeDistributionCard } from "../components/grades/GradeSidebarWidgets";
import { gradeBookData } from "../data/teacherDashboardData";

function TeacherGrades() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("todos");
    const [statusFilter, setStatusFilter] = useState("todos");

    // Real-time filtering logic
    const filteredGrades = gradeBookData.filter((row) => {
        const matchesSearch =
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse =
            courseFilter === "todos" || row.course === courseFilter;
        const matchesStatus =
            statusFilter === "todos" || row.status === statusFilter;

        return matchesSearch && matchesCourse && matchesStatus;
    });

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                
                {/* 1. CABECERA */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Calificaciones
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Gestiona el registro de notas, consolidados y actas de tus estudiantes.
                    </p>
                </div>

                {/* 2. STATS ROW */}
                <GradeStatsGrid />

                {/* 3. RESPONSIVE 4-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    
                    {/* LEFT / CENTER REGIONS (3 Columns): Grade Book Register */}
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

                    {/* RIGHT SIDEBAR REGIONS (1 Column): Widgets */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Quick Action Shortcuts */}
                        <GradeQuickActionsCard />

                        {/* Grade Distribution Horizontal Chart */}
                        <GradeDistributionCard />

                    </div>

                </div>

            </div>
        </TeacherLayout>
    );
}

export default TeacherGrades;
