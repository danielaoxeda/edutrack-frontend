import { Search, Download, CheckSquare, Calendar, UserCheck, Check, AlertCircle } from "lucide-react";
import type { AttendanceRegistryItem } from "../../data/teacherDashboardData";

interface TableProps {
    attendanceList: AttendanceRegistryItem[];
    onStatusChange: (id: string, newStatus: "presente" | "tardanza" | "falta") => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    courseFilter: string;
    setCourseFilter: (course: string) => void;
    groupFilter: string;
    setGroupFilter: (group: string) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    onSave: () => void;
    onExport: () => void;
    showToast: boolean;
}

function AttendanceRegisterTable({
    attendanceList,
    onStatusChange,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    groupFilter,
    setGroupFilter,
    selectedDate,
    setSelectedDate,
    onSave,
    onExport,
    showToast,
}: TableProps) {
    
    // Style helper for accumulated attendance meter
    const getProgressBarColor = (percentage: number) => {
        if (percentage >= 90) return "bg-emerald-500";
        if (percentage >= 75) return "bg-amber-500";
        return "bg-rose-500 animate-pulse";
    };

    const getProgressTextColor = (percentage: number) => {
        if (percentage >= 90) return "text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-100/50";
        if (percentage >= 75) return "text-amber-700 font-extrabold bg-amber-50 border border-amber-100/50";
        return "text-rose-700 font-extrabold bg-rose-50 border border-rose-100/50";
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden p-6 relative">
            
            {/* Success Toast styled beautifully inside the card container */}
            {showToast && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-30 transition-all duration-300 animate-bounce">
                    <div className="bg-emerald-500 p-1 rounded-full text-slate-950">
                        <Check size={14} className="stroke-[3]" />
                    </div>
                    <div className="text-xs">
                        <p className="font-extrabold text-slate-100">Asistencia Guardada</p>
                        <p className="text-[10px] text-slate-400">Registros de hoy guardados con éxito en EduTrack.</p>
                    </div>
                </div>
            )}

            {/* Header: title and actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <UserCheck size={18} className="text-teal-600" />
                    <h2 className="text-lg font-bold text-slate-800">
                        Planilla de Asistencia Diaria
                    </h2>
                </div>

                {/* Actions buttons */}
                <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
                    <button 
                        onClick={onExport}
                        className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 shadow-sm text-xs"
                    >
                        <Download size={14} className="text-slate-400" />
                        <span>Exportar Reporte</span>
                    </button>
                    <button 
                        onClick={onSave}
                        className="flex-1 sm:flex-none bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 hover:border-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 shadow-sm text-xs group"
                    >
                        <CheckSquare size={14} className="text-white group-hover:scale-110 transition-transform" />
                        <span>Guardar Asistencia</span>
                    </button>
                </div>
            </div>

            {/* Filter toolbar inside the card */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-5">
                
                {/* Search and Date Picker */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
                    
                    {/* Search */}
                    <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-all duration-200 sm:w-[220px]">
                        <Search size={15} className="text-slate-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Buscar estudiante..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none ml-2 text-xs text-slate-700 placeholder-slate-400 w-full"
                        />
                    </div>

                    {/* Date Picker */}
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm text-slate-600 hover:bg-slate-100 transition sm:w-[170px]">
                        <Calendar size={14} className="text-slate-400 shrink-0 mr-2" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-transparent text-[11px] font-bold text-slate-600 outline-none w-full cursor-pointer"
                        />
                    </div>
                </div>

                {/* Dropdowns for Course & Group */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                    
                    {/* Course Filter */}
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

                    {/* Group Filter */}
                    <select
                        value={groupFilter}
                        onChange={(e) => setGroupFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-3 py-2 cursor-pointer text-[11px] font-semibold text-slate-600 shadow-sm transition outline-none"
                    >
                        <option value="todos">Todos los Grupos</option>
                        <option value="Grupo A">Grupo A</option>
                        <option value="Grupo B">Grupo B</option>
                        <option value="Grupo C">Grupo C</option>
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
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3">
                                Curso / Grupo
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center w-[240px]">
                                Registro de Hoy (P / T / F)
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3 text-center w-[180px]">
                                Asistencia Acumulada
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {attendanceList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-xs text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <AlertCircle size={20} className="text-slate-300" />
                                        <span>No se encontraron estudiantes que coincidan con los filtros.</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            attendanceList.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50/40 transition duration-150 group">
                                    
                                    {/* Student avatar and information */}
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8.5 h-8.5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center font-bold text-xs text-teal-600 shrink-0 shadow-sm">
                                                {row.name.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div className="leading-tight">
                                                <span className="font-bold text-sm text-slate-800 block group-hover:text-teal-600 transition-colors">
                                                    {row.name}
                                                </span>
                                                <span className="text-[10px] font-semibold text-slate-400 block mt-0.5 uppercase tracking-wider">
                                                    {row.code} • {row.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Course and Group */}
                                    <td className="px-4 py-3.5">
                                        <div className="leading-tight">
                                            <span className="font-bold text-xs text-slate-700 block">
                                                {row.course}
                                            </span>
                                            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                                {row.group}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Interactive Attendance Toggle Switch: Presente (P), Tardanza (T), Falta (F) */}
                                    <td className="px-4 py-3.5 text-center">
                                        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/60 shadow-inner">
                                            
                                            {/* Presente button */}
                                            <button
                                                type="button"
                                                onClick={() => onStatusChange(row.id, "presente")}
                                                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all duration-200 ${
                                                    row.todayStatus === "presente"
                                                        ? "bg-emerald-500 text-white shadow-md border-b-2 border-emerald-600/50 scale-105"
                                                        : "text-slate-400 hover:text-slate-600 hover:bg-white"
                                                }`}
                                            >
                                                P
                                            </button>

                                            {/* Tardanza button */}
                                            <button
                                                type="button"
                                                onClick={() => onStatusChange(row.id, "tardanza")}
                                                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all duration-200 ${
                                                    row.todayStatus === "tardanza"
                                                        ? "bg-amber-500 text-white shadow-md border-b-2 border-amber-600/50 scale-105"
                                                        : "text-slate-400 hover:text-slate-600 hover:bg-white"
                                                }`}
                                            >
                                                T
                                            </button>

                                            {/* Falta button */}
                                            <button
                                                type="button"
                                                onClick={() => onStatusChange(row.id, "falta")}
                                                className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all duration-200 ${
                                                    row.todayStatus === "falta"
                                                        ? "bg-rose-500 text-white shadow-md border-b-2 border-rose-600/50 scale-105"
                                                        : "text-slate-400 hover:text-slate-600 hover:bg-white"
                                                }`}
                                            >
                                                F
                                            </button>

                                        </div>
                                    </td>

                                    {/* Accumulated Attendance progress bar */}
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0 border border-slate-200/30">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-500 ${row.attendance === null ? "bg-slate-300" : getProgressBarColor(row.attendance)}`}
                                                    style={{ width: `${row.attendance ?? 0}%` }}
                                                />
                                            </div>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm shrink-0 w-[45px] text-center ${row.attendance === null ? "bg-slate-100 text-slate-500" : getProgressTextColor(row.attendance)}`}>
                                                {row.attendance === null ? "--" : `${row.attendance}%`}
                                            </span>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default AttendanceRegisterTable;
