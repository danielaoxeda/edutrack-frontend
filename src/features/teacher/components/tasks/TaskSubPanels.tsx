import { Clock, GraduationCap } from "lucide-react";
import { recentSubmissionsData } from "../../data/teacherDashboardData";

function TaskSubPanels() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Entregas Recientes */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-1.5">
                    <Clock size={16} className="text-blue-500" />
                    <span>Entregas Recientes</span>
                </h2>

                <div className="space-y-4">
                    {recentSubmissionsData.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition duration-150 group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                                    {sub.studentName.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="leading-tight">
                                    <span className="font-bold text-xs text-slate-800 block group-hover:text-blue-600 transition-colors">
                                        {sub.studentName}
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                        {sub.taskName} • <span className="font-bold text-slate-500">{sub.courseName}</span>
                                    </span>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 shrink-0 whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded">
                                {sub.timeAgo}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Calificaciones Pendientes */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-1.5">
                    <GraduationCap size={16} className="text-blue-500" />
                    <span>Calificaciones Pendientes</span>
                </h2>

                <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between gap-3 p-3 bg-rose-50/40 border border-rose-100/50 rounded-xl shadow-sm/5">
                        <div>
                            <span className="font-bold text-xs text-slate-800 block">
                                Proyecto de Ciencias
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                Biología I • Grupo C
                            </span>
                        </div>
                        <span className="text-[10px] font-extrabold bg-rose-500 text-white px-2.5 py-1 rounded shadow-sm shrink-0 whitespace-nowrap">
                            15 por revisar
                        </span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between gap-3 p-3 bg-amber-50/40 border border-amber-100/50 rounded-xl shadow-sm/5">
                        <div>
                            <span className="font-bold text-xs text-slate-800 block">
                                Ensayo Final: Historia
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                Historia II • Grupo A
                            </span>
                        </div>
                        <span className="text-[10px] font-extrabold bg-amber-500 text-white px-2.5 py-1 rounded shadow-sm shrink-0 whitespace-nowrap">
                            8 por revisar
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TaskSubPanels;
