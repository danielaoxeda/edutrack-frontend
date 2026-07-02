import { FilePlus, CloudUpload, CalendarDays, Send, AlertTriangle } from "lucide-react";
import type { UrgentTaskItem } from "../../data/teacherDashboardData";

interface TaskSidebarWidgetsProps {
    urgentTasks: UrgentTaskItem[];
}

export function TaskQuickActionsCard() {
    const actions = [
        { label: "Crear tarea", icon: FilePlus, color: "text-blue-600 bg-blue-50 border-blue-100" },
        { label: "Subir material", icon: CloudUpload, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
        { label: "Programar eval.", icon: CalendarDays, color: "text-amber-600 bg-amber-50 border-amber-100" },
        { label: "Enviar aviso", icon: Send, color: "text-violet-600 bg-violet-50 border-violet-100" },
    ];

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100">
                Accesos Rápidos
            </h2>

            <div className="grid grid-cols-2 gap-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <div
                            key={action.label}
                            className="bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-sm group text-center"
                        >
                            <div className={`p-2.5 rounded-lg border ${action.color} flex items-center justify-center shrink-0 shadow-sm/5 transition-transform duration-200 group-hover:scale-105`}>
                                <Icon size={20} className="stroke-[2.25]" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors tracking-tight mt-0.5 leading-snug">
                                {action.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function UrgentTasksCard({ urgentTasks }: TaskSidebarWidgetsProps) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <AlertTriangle size={16} className="text-red-500 animate-bounce" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Tareas Urgentes
                </h2>
            </div>

            <div className="space-y-4">
                {urgentTasks.map((task) => {
                    const isToday = task.dueText.toLowerCase().includes("hoy");
                    const dueClass = isToday ? "text-red-500 font-extrabold" : "text-slate-400 font-semibold";

                    return (
                        <div key={task.id} className="bg-slate-50 border border-slate-200/40 rounded-xl p-3.5 space-y-3 shadow-sm/5">
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <h3 className="font-bold text-sm text-slate-800 leading-snug">
                                        {task.title}
                                    </h3>
                                    <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                        {task.courseName}
                                    </span>
                                </div>
                                <span className={`text-[10px] uppercase tracking-wide shrink-0 ${dueClass}`}>
                                    {task.dueText}
                                </span>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                                    <span>Entregas</span>
                                    <span>{task.receivedCount}/{task.totalCount} ({task.percentage}%)</span>
                                </div>
                                <div className="w-full bg-slate-150 h-1.5 rounded-full overflow-hidden border border-slate-200/20">
                                    <div
                                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${task.percentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
