import { useState } from "react";
import TeacherLayout from "../components/layout/TeacherLayout";
import TaskStatsGrid from "../components/tasks/TaskStatsGrid";
import TaskTable from "../components/tasks/TaskTable";
import TaskSubPanels from "../components/tasks/TaskSubPanels";
import { TaskQuickActionsCard, UrgentTasksCard } from "../components/tasks/TaskSidebarWidgets";
import { tasksData } from "../data/teacherDashboardData";

function TeacherTasks() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("todos");
    const [statusFilter, setStatusFilter] = useState("todos");

    // Real-time filtering logic
    const filteredTasks = tasksData.filter((task) => {
        const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = courseFilter === "todos" || task.course === courseFilter;
        const matchesStatus = statusFilter === "todos" || task.status === statusFilter;
        
        return matchesSearch && matchesCourse && matchesStatus;
    });

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                
                {/* 1. CABECERA */}
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Tareas
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Gestiona las actividades, entregas y revisiones de tus cursos.
                    </p>
                </div>

                {/* 2. STATS ROW */}
                <TaskStatsGrid />

                {/* 3. RESPONSIVE 4-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    
                    {/* LEFT / CENTER REGIONS (3 Columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* Interactive Task Table */}
                        <TaskTable
                            tasks={filteredTasks}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            courseFilter={courseFilter}
                            setCourseFilter={setCourseFilter}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                        />

                        {/* Bottom Subpanels (Recent Submissions & Pending reviews) */}
                        <TaskSubPanels />

                    </div>

                    {/* RIGHT SIDEBAR REGIONS (1 Column) */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Quick Action Buttons */}
                        <TaskQuickActionsCard />

                        {/* Urgent Tasks Progress Indicators */}
                        <UrgentTasksCard />

                    </div>

                </div>

            </div>
        </TeacherLayout>
    );
}

export default TeacherTasks;
