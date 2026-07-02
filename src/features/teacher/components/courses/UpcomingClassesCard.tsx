import { CalendarDays, Clock, Laptop, MapPin } from "lucide-react";
import type { ClassScheduleItem } from "../../data/teacherDashboardData";

interface UpcomingClassesCardProps {
    schedule: ClassScheduleItem[];
}

function UpcomingClassesCard({ schedule }: UpcomingClassesCardProps) {
    const hasClasses = schedule.length > 0;

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Clock size={16} className="text-blue-500" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Proximas clases
                </h2>
            </div>

            {hasClasses ? (
                <div className="space-y-4 mb-4">
                    {schedule.map((item) => {
                        const isVirtual = item.location.toLowerCase().includes("virtual");
                        const LocationIcon = isVirtual ? Laptop : MapPin;
                        const dayLabel = item.time.toLowerCase().includes("hoy") ? "Hoy" : "Proxima";

                        return (
                            <div key={item.id} className="space-y-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                    {dayLabel}
                                </span>

                                <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-1.5 shadow-sm/5">
                                    <span className="text-xs font-extrabold text-blue-600">
                                        {item.time}
                                    </span>
                                    <h3 className="font-bold text-sm text-slate-800 leading-snug">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                                        <LocationIcon size={12} className="shrink-0 text-slate-400" />
                                        <span>{item.location}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="mb-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No hay clases programadas para mostrar.
                </div>
            )}

            <button className="w-full text-center py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl transition duration-200 shadow-sm flex items-center justify-center gap-1.5">
                <CalendarDays size={14} className="text-slate-400" />
                <span>Ver Horario Completo</span>
            </button>
        </div>
    );
}

export default UpcomingClassesCard;
