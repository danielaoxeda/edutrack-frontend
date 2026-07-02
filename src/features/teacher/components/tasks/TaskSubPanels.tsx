import { Clock, GraduationCap } from "lucide-react";
import type { RecentSubmissionItem, UrgentTaskItem } from "../../data/teacherDashboardData";

interface TaskSubPanelsProps {
    recentSubmissions: RecentSubmissionItem[];
    urgentTasks: UrgentTaskItem[];
}

function TaskSubPanels({ recentSubmissions, urgentTasks }: TaskSubPanelsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-1.5">
                    <Clock size={16} className="text-blue-500" />
                    <span>Entregas Recientes</span>
                </h2>

                <div className="space-y-4">
                    {recentSubmissions.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition duration-150 group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                                    {sub.studentName.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div className="leading-tight">
                                    <span className="font-bold text-xs text-slate-800 block group-hover:text-blue-600 transition-colors">
                                        {sub.studentName}
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                        {sub.taskName} · <span className="font-bold text-slate-500">{sub.courseName}</span>
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

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-1.5">
                    <GraduationCap size={16} className="text-blue-500" />
                    <span>Calificaciones Pendientes</span>
                </h2>

                <div className="space-y-4">
                    {urgentTasks.map((task) => {
                        const isToday = task.dueText.toLowerCase().includes("hoy");
                        return (
                            <div
                                key={task.id}
                                className={`flex items-center justify-between gap-3 p-3 rounded-xl shadow-sm/5 ${
                                    isToday ? "bg-rose-50/40 border border-rose-100/50" : "bg-amber-50/40 border border-amber-100/50"
                                }`}
                            >
                                <div>
                                    <span className="font-bold text-xs text-slate-800 block">
                                        {task.title}
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                        {task.courseName}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-extrabold text-white px-2.5 py-1 rounded shadow-sm shrink-0 whitespace-nowrap ${isToday ? "bg-rose-500" : "bg-amber-500"}`}>
                                    {task.receivedCount} por revisar
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TaskSubPanels;
