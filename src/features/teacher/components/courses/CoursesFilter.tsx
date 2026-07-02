import { Search } from "lucide-react";

interface FilterProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}

function CoursesFilter({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
}: FilterProps) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm w-full lg:max-w-[340px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200 shrink-0">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                    type="text"
                    placeholder="Buscar curso o codigo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none ml-2.5 text-sm text-slate-700 placeholder-slate-400 w-full"
                />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="relative flex items-center bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl px-4 py-2.5 cursor-pointer text-xs font-semibold text-slate-600 shadow-sm transition outline-none appearance-none pr-8"
                    style={{
                        backgroundImage:
                            `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1.25rem 1.25rem",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <option value="todos">Todos los Estados</option>
                    <option value="activo">Estado: Activo</option>
                    <option value="progreso">Estado: En Progreso</option>
                </select>
            </div>
        </div>
    );
}

export default CoursesFilter;
