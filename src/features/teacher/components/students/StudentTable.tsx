import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StudentItem } from "../../data/teacherDashboardData";

interface TableProps {
    students: StudentItem[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function StudentTable({ students, totalCount, currentPage, totalPages, onPageChange }: TableProps) {
    
    // Status Badge Helpers
    const getStatusBadge = (status: StudentItem["status"]) => {
        switch (status) {
            case "sobresaliente":
                return (
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
                        Sobresaliente
                    </span>
                );
            case "regular":
                return (
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200/50 uppercase tracking-wide">
                        Regular
                    </span>
                );
            case "riesgo":
                return (
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-100 uppercase tracking-wide animate-pulse">
                        En Riesgo
                    </span>
                );
            case "sin_evaluacion":
                return (
                    <span className="rounded border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                        Sin evaluar
                    </span>
                );
            default:
                return null;
        }
    };

    // Attendance Bar Helpers
    const getAttendanceBarColor = (percent: number) => {
        if (percent >= 90) return "bg-emerald-500";
        if (percent >= 75) return "bg-blue-500";
        return "bg-rose-500";
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden">
            {/* Table wrapper */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">
                                Estudiante
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">
                                Código
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">
                                Curso / Grupo
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">
                                Promedio
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4">
                                Asist.
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 py-4 text-center">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/40 transition duration-150 group">
                                {/* Student Info with avatar */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-sm text-blue-600 shrink-0">
                                            {row.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="leading-tight">
                                            <span className="font-bold text-sm text-slate-800 block group-hover:text-blue-600 transition-colors">
                                                {row.name}
                                            </span>
                                            <span className="text-xs text-slate-400 block mt-0.5">
                                                {row.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Code */}
                                <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                                    {row.code}
                                </td>

                                {/* Course & Group */}
                                <td className="px-6 py-4">
                                    <span className="font-bold text-xs text-slate-700 block">
                                        {row.course}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
                                        {row.group}
                                    </span>
                                </td>

                                {/* Average Grade */}
                                <td className="px-6 py-4">
                                    <span className={`text-sm font-extrabold ${row.averageGrade !== null && row.averageGrade < 3.0 ? "text-rose-600" : "text-slate-800"}`}>
                                        {row.averageGrade === null ? "--" : row.averageGrade.toFixed(1)}
                                    </span>
                                </td>

                                {/* Attendance Bar */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3 min-w-[100px]">
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/20">
                                            <div
                                                className={`h-full rounded-full ${row.attendance === null ? "bg-slate-300" : getAttendanceBarColor(row.attendance)}`}
                                                style={{ width: `${row.attendance ?? 0}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs font-extrabold shrink-0 ${row.attendance !== null && row.attendance < 75 ? "text-rose-600" : "text-slate-700"}`}>
                                            {row.attendance === null ? "--" : `${row.attendance}%`}
                                        </span>
                                    </div>
                                </td>

                                {/* Status badge */}
                                <td className="px-6 py-4 text-center">
                                    {getStatusBadge(row.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            <div className="bg-slate-50/50 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                    Mostrando {totalCount === 0 ? 0 : (currentPage - 1) * 5 + 1}-{Math.min(currentPage * 5, totalCount)} de {totalCount} estudiantes
                </span>
                
                {/* Pagination Controls */}
                <div className="flex items-center gap-1">
                    <button type="button" onClick={() => onPageChange(currentPage - 1)} className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 shadow-sm transition disabled:opacity-50" disabled={currentPage === 1}>
                        <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={`h-8 w-8 rounded-lg text-xs font-bold shadow-sm ${page === currentPage ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button type="button" onClick={() => onPageChange(currentPage + 1)} className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 shadow-sm transition disabled:opacity-50" disabled={currentPage >= totalPages}>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentTable;
