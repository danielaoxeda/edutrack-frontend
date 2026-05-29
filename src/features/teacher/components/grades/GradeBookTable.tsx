import { Search, Plus, Download, GraduationCap, ArrowUpDown } from "lucide-react";
import type { GradeBookItem } from "../../data/teacherDashboardData";

interface TableProps {
    grades: GradeBookItem[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    courseFilter: string;
    setCourseFilter: (course: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}

function GradeBookTable({
    grades,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    statusFilter,
    setStatusFilter,
}: TableProps) {
    
    // Status Badge Helpers
    const getStatusBadge = (status: GradeBookItem["status"]) => {
        switch (status) {
            case "aprobado":
                return (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
                        Aprobado
                    </span>
                );
            case "reprobado":
                return (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 uppercase tracking-wide">
                        Reprobado
                    </span>
                );
            case "pendiente":
                return (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide animate-pulse">
                        Pendiente
                    </span>
                );
            default:
                return null;
        }
    };

    // Style helper for grades (< 3.0 is reprobado/red)
    const getGradeClass = (grade: number) => {
        if (grade < 3.0) return "text-rose-600 font-extrabold bg-rose-50/50 px-1 py-0.5 rounded border border-rose-100/50";
        return "text-slate-700 font-bold";
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden p-6">
            
            {/* Header: title and + Crear nueva tarea button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-blue-600" />
                    <h2 className="text-lg font-bold text-slate-800">
                        Registro de Notas por Asignatura
                    </h2>
                </div>

                {/* Actions buttons */}
                <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 shadow-sm text-xs">
                        <Download size={14} className="text-slate-400" />
                        <span>Exportar Reporte</span>
                    </button>
                    <button className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 hover:border-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 shadow-sm text-xs group">
                        <Plus size={14} className="text-white group-hover:scale-110 transition-transform" />
                        <span>Publicar Notas</span>
                    </button>
                </div>
            </div>

            {/* Filter toolbar inside the card */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-5">
                
                {/* Search */}
                <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm w-full md:max-w-[240px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200">
                    <Search size={15} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar estudiante..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none ml-2 text-xs text-slate-700 placeholder-slate-400 w-full"
                    />
                </div>

                {/* Dropdowns */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                    
                    {/* Course */}
                    <select
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-3 py-2 cursor-pointer text-[11px] font-semibold text-slate-600 shadow-sm transition outline-none"
                    >
                        <option value="todos">Todos los Cursos</option>
                        <option value="Ingeniería de Software">Ingeniería de Software</option>
                        <option value="Sistemas Operativos">Sistemas Operativos</option>
                        <option value="Base de Datos II">Base de Datos II</option>
                        <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                    </select>

                    {/* Performance */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-3 py-2 cursor-pointer text-[11px] font-semibold text-slate-600 shadow-sm transition outline-none"
                    >
                        <option value="todos">Todos los Rendimientos</option>
                        <option value="aprobado">Aprobados</option>
                        <option value="reprobado">Reprobados</option>
                        <option value="pendiente">Pendientes</option>
                    </select>
                </div>

            </div>

            {/* Table Spreadsheet style */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3">
                                Estudiante
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center">
                                PC1 (15%)
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center">
                                PC2 (15%)
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center">
                                Parcial (30%)
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center">
                                Final (40%)
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center">
                                <div className="flex items-center justify-center gap-0.5 cursor-pointer hover:text-slate-600">
                                    <span>Promedio</span>
                                    <ArrowUpDown size={10} />
                                </div>
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {grades.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/40 transition duration-150 group">
                                {/* Student name */}
                                <td className="px-4 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-blue-600 shrink-0">
                                            {row.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="leading-tight">
                                            <span className="font-bold text-sm text-slate-800 block group-hover:text-blue-600 transition-colors">
                                                {row.name}
                                            </span>
                                            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5 uppercase">
                                                {row.code} • {row.group}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* PC1 */}
                                <td className="px-4 py-3.5 text-center text-xs">
                                    <span className={getGradeClass(row.pc1)}>{row.pc1.toFixed(1)}</span>
                                </td>

                                {/* PC2 */}
                                <td className="px-4 py-3.5 text-center text-xs">
                                    <span className={getGradeClass(row.pc2)}>{row.pc2.toFixed(1)}</span>
                                </td>

                                {/* Parcial */}
                                <td className="px-4 py-3.5 text-center text-xs">
                                    <span className={getGradeClass(row.parcial)}>{row.parcial.toFixed(1)}</span>
                                </td>

                                {/* Final */}
                                <td className="px-4 py-3.5 text-center text-xs">
                                    <span className={getGradeClass(row.final)}>{row.final.toFixed(1)}</span>
                                </td>

                                {/* Promedio */}
                                <td className="px-4 py-3.5 text-center text-sm font-extrabold">
                                    <span className={row.average < 3.0 ? "text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded shadow-sm/5 inline-block" : "text-slate-800"}>
                                        {row.average.toFixed(1)}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3.5 text-center">
                                    {getStatusBadge(row.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default GradeBookTable;
