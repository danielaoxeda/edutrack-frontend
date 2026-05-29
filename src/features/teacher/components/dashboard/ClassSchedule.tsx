import { CalendarDays, MapPin } from "lucide-react";
import { scheduleData } from "../../data/teacherDashboardData";

function ClassSchedule() {
    return (
        <div className="flex flex-col">
            {/* Header (External, matching "Mis Cursos Activos") */}
            <div className="flex items-center gap-2 mb-4 py-1">
                <CalendarDays size={18} className="text-blue-600" />
                <h2 className="text-lg font-bold text-slate-800">
                    Próximas Clases
                </h2>
            </div>

            {/* Card Content */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                    Hoy
                </span>

            {/* Schedule Timeline */}
            <div className="relative border-l border-slate-100 ml-3 pl-6 space-y-6">
                {scheduleData.map((item) => {
                    const isEval = item.type === "Evaluación";
                    const dotClass = isEval ? "bg-rose-500 ring-rose-100" : "bg-blue-500 ring-blue-100";
                    const badgeClass = isEval
                        ? "bg-rose-50 text-rose-700 border-rose-100"
                        : "bg-blue-50 text-blue-700 border-blue-100";

                    return (
                        <div key={item.id} className="relative group">
                            {/* Timeline bullet */}
                            <div className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full ring-4 ${dotClass} transition-transform duration-300 group-hover:scale-125`} />

                            <div className="space-y-1.5">
                                {/* Time and Type Badge */}
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xs font-extrabold text-slate-700">
                                        {item.time}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                                        {item.type}
                                    </span>
                                </div>

                                {/* Class Title */}
                                <h3 className="font-bold text-sm text-slate-800 tracking-tight leading-snug">
                                    {item.title}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                                    <MapPin size={12} className="shrink-0" />
                                    <span>{item.location}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    );
}

export default ClassSchedule;
