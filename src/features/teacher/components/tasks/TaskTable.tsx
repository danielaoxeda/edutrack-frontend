import { Eye, Edit, Trash2, Calendar, ClipboardCheck, Search, Plus, Filter } from "lucide-react";
import type { TaskItem } from "../../data/teacherDashboardData";

interface TableProps {
    tasks: TaskItem[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    courseFilter: string;
    setCourseFilter: (course: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}

function TaskTable({
    tasks,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    statusFilter,
    setStatusFilter,
}: TableProps) {
    
    // Status Badge Helpers
    const getStatusBadge = (status: TaskItem["status"]) => {
        switch (status) {
            case "activo":
                return (
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
                        Activo
                    </span>
                );
            case "calificando":
                return (
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide animate-pulse">
                        Calificando
                    </span>
                );
            case "evaluado":
                return (
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-slate-100 text-slate-500 border border-slate-200/50 uppercase tracking-wide">
                        Evaluado
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col overflow-hidden p-6">
            
            {/* Header: title and + Crear nueva tarea button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <ClipboardCheck size={18} className="text-blue-600" />
                    <h2 className="text-lg font-bold text-slate-800">
                        Gestión de Tareas
                    </h2>
                </div>

                <button className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 hover:border-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 shadow-sm text-xs self-start sm:self-auto group">
                    <Plus size={14} className="text-white group-hover:scale-110 transition-transform" />
                    <span>Crear nueva tarea</span>
                </button>
            </div>

            {/* Filter toolbar inside the card */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-5">
                
                {/* Search */}
                <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm w-full md:max-w-[240px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200">
                    <Search size={15} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar tarea..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none ml-2 text-xs text-slate-700 placeholder-slate-400 w-full"
                    />
                </div>

                {/* Dropdowns and clear button */}
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

                    {/* Status */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-3 py-2 cursor-pointer text-[11px] font-semibold text-slate-600 shadow-sm transition outline-none"
                    >
                        <option value="todos">Todos los Estados</option>
                        <option value="activo">Activo</option>
                        <option value="calificando">Calificando</option>
                        <option value="evaluado">Evaluado</option>
                    </select>

                    {/* Más filtros */}
                    <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 shadow-sm text-[11px]">
                        <Filter size={12} className="text-slate-400" />
                        <span>Más filtros</span>
                    </button>
                </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 pl-2">
                                Nombre
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3">
                                Curso / Grupo
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3">
                                Fechas
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3">
                                Entregas
                            </th>
                            <th className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-3 text-center">
                                Estado
                            </th>
                            <th className="pb-3 text-right pr-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tasks.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/40 transition duration-150 group">
                                {/* Task name */}
                                <td className="py-3.5 pl-2 pr-2">
                                    <span className="font-bold text-sm text-slate-800 block group-hover:text-blue-600 transition-colors">
                                        {row.name}
                                    </span>
                                </td>

                                {/* Course / Group */}
                                <td className="py-3.5 pr-2">
                                    <span className="font-bold text-xs text-slate-600 block">
                                        {row.course}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
                                        {row.group}
                                    </span>
                                </td>

                                {/* Dates */}
                                <td className="py-3.5 pr-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                        <Calendar size={13} className="text-slate-400 shrink-0" />
                                        <span>Pub: {row.publishedDate} - Lim: {row.limitDate}</span>
                                    </div>
                                </td>

                                {/* Deliveries Count */}
                                <td className="py-3.5 pr-2">
                                    <span className="text-xs font-extrabold text-blue-600 hover:underline cursor-pointer">
                                        {row.receivedCount}/{row.totalCount}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="py-3.5 text-center">
                                    {getStatusBadge(row.status)}
                                </td>

                                {/* Actions */}
                                <td className="py-3.5 text-right pr-2">
                                    <div className="flex items-center gap-1 ml-auto justify-end">
                                        <button className="p-1.5 rounded-lg border border-slate-100 hover:border-blue-200 bg-white hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition duration-150 shadow-sm/5">
                                            <Eye size={13} />
                                        </button>
                                        <button className="p-1.5 rounded-lg border border-slate-100 hover:border-amber-200 bg-white hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition duration-150 shadow-sm/5">
                                            <Edit size={13} />
                                        </button>
                                        <button className="p-1.5 rounded-lg border border-slate-100 hover:border-red-200 bg-white hover:bg-rose-50 text-slate-400 hover:text-red-600 transition duration-150 shadow-sm/5">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default TaskTable;
