import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import TeacherLayout from "../components/layout/TeacherLayout";
import CoursesFilter from "../components/courses/CoursesFilter";
import CourseCardDetail from "../components/courses/CourseCardDetail";
import QuickActionsCard from "../components/courses/QuickActionsCard";
import UpcomingClassesCard from "../components/courses/UpcomingClassesCard";
import AlertsAndPendingCard from "../components/courses/AlertsAndPendingCard";
import { coursesData } from "../data/teacherDashboardData";

function TeacherCourses() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");

    // Real-time filtering logic
    const filteredCourses = coursesData.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "todos" || course.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                
                {/* 1. MODULE TITLE & MAIN ACTION */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Mis Cursos
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Gestiona tus cursos asignados y el progreso de tus estudiantes.
                        </p>
                    </div>

                    {/* Green Action Button from mockup */}
                    <button className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 hover:border-emerald-500 text-white font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm text-sm shrink-0 self-start sm:self-auto group">
                        <Plus size={16} className="text-white group-hover:scale-110 transition-transform duration-200" />
                        <span>Crear actividad</span>
                    </button>
                </div>

                {/* 2. TOOLBAR FILTERS */}
                <CoursesFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                {/* 3. RESPONSIVE 3-COLUMN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT / CENTER REGIONS (2 Columns): Course List */}
                    <div className="lg:col-span-2 space-y-6">
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredCourses.map((course) => (
                                    <CourseCardDetail
                                        key={course.id}
                                        course={course}
                                    />
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
                                    Prueba a modificar la búsqueda o a cambiar los filtros para ver tus asignaturas.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR REGIONS (1 Column): Widgets */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Quick Shortcuts */}
                        <QuickActionsCard />

                        {/* Schedule Info */}
                        <UpcomingClassesCard />

                        {/* Alert Warning Box */}
                        <AlertsAndPendingCard />

                    </div>

                </div>

            </div>
        </TeacherLayout>
    );
}

export default TeacherCourses;
