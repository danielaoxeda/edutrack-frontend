import { useState } from "react";
import { Send, Download, Search, X, AlertCircle } from "lucide-react";
import TeacherLayout from "../components/layout/TeacherLayout";
import StudentStatsGrid from "../components/students/StudentStatsGrid";
import StudentTable from "../components/students/StudentTable";
import StudentAlertsCard from "../components/students/StudentAlertsCard";
import { studentsData } from "../data/teacherDashboardData";

function TeacherStudents() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courseFilter, setCourseFilter] = useState("todos");
    const [groupFilter, setGroupFilter] = useState("todos");
    const [statusFilter, setStatusFilter] = useState("todos");

    // Clear all filters
    const handleClearFilters = () => {
        setSearchQuery("");
        setCourseFilter("todos");
        setGroupFilter("todos");
        setStatusFilter("todos");
    };

    // Filter logic
    const filteredStudents = studentsData.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse =
            courseFilter === "todos" || student.course === courseFilter;
        const matchesGroup =
            groupFilter === "todos" || student.group === groupFilter;
        const matchesStatus =
            statusFilter === "todos" || student.status === statusFilter;

        return matchesSearch && matchesCourse && matchesGroup && matchesStatus;
    });

    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                
                {/* 1. CABECERA Y BOTONES DE ACCIÓN */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Directorio de Estudiantes
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                            Gestiona y monitorea el rendimiento, asistencia y estado de tus estudiantes en todos los cursos.
                        </p>
                    </div>

                    {/* Action buttons from mockup */}
                    <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-sm text-sm">
                            <Send size={15} className="text-slate-400" />
                            <span>Enviar comunicado</span>
                        </button>
                        <button className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 hover:border-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-sm text-sm group">
                            <Download size={15} className="text-white group-hover:scale-105 transition-transform" />
                            <span>Exportar lista</span>
                        </button>
                    </div>
                </div>

                {/* 2. STATS ROW */}
                <StudentStatsGrid />

                {/* 3. TOOLBAR FILTERS & SEARCH */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    
                    {/* Filter Group selectors */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mr-1">
                            Filtros:
                        </span>

                        {/* Course filter selector */}
                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-3 py-2 cursor-pointer text-xs font-semibold text-slate-600 shadow-sm transition outline-none"
                        >
                            <option value="todos">Todos los Cursos</option>
                            <option value="Ingeniería de Software">Ingeniería de Software</option>
                            <option value="Sistemas Operativos">Sistemas Operativos</option>
                            <option value="Base de Datos II">Base de Datos II</option>
                            <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                        </select>

                        {/* Group filter selector */}
                        <select
                            value={groupFilter}
                            onChange={(e) => setGroupFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-3 py-2 cursor-pointer text-xs font-semibold text-slate-600 shadow-sm transition outline-none"
                        >
                            <option value="todos">Todos los Grupos</option>
                            <option value="Grupo A">Grupo A</option>
                            <option value="Grupo B">Grupo B</option>
                            <option value="Grupo C">Grupo C</option>
                        </select>

                        {/* Performance filter selector */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-3 py-2 cursor-pointer text-xs font-semibold text-slate-600 shadow-sm transition outline-none"
                        >
                            <option value="todos">Estado: Todas</option>
                            <option value="sobresaliente">Sobresaliente</option>
                            <option value="regular">Regular</option>
                            <option value="riesgo">En Riesgo</option>
                        </select>
                    </div>

                    {/* Right side: Search Box and Clear button */}
                    <div className="flex items-center gap-4 w-full md:w-auto shrink-0 justify-end">
                        
                        {/* Search Input Box */}
                        <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-sm w-full md:w-[260px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shrink-0">
                            <Search size={16} className="text-slate-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, código..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent outline-none ml-2 text-xs text-slate-700 placeholder-slate-400 w-full"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600 ml-1">
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Clear Filters link */}
                        <button
                            onClick={handleClearFilters}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0 whitespace-nowrap"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>

                {/* 4. SPLIT 4-COLUMN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    
                    {/* LEFT / CENTER REGIONS (3 Columns): Student Directory */}
                    <div className="lg:col-span-3 space-y-6">
                        {filteredStudents.length > 0 ? (
                            <StudentTable
                                students={filteredStudents}
                                totalCount={studentsData.length}
                            />
                        ) : (
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3 shadow-sm min-h-[300px]">
                                <div className="p-4 bg-slate-50 text-slate-400 border border-slate-200/50 rounded-2xl">
                                    <AlertCircle size={36} className="stroke-[1.5]" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">
                                    No se encontraron estudiantes
                                </h3>
                                <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed">
                                    Prueba a ajustar tu búsqueda o los selectores de filtros para ver el listado de alumnos.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR REGIONS (1 Column): Alerts */}
                    <div className="lg:col-span-1">
                        <StudentAlertsCard />
                    </div>

                </div>

            </div>
        </TeacherLayout>
    );
}

export default TeacherStudents;
