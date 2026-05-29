import { Clock, MapPin, Laptop, CalendarDays } from "lucide-react";

function UpcomingClassesCard() {
    const schedule = [
        {
            day: "HOY",
            time: "14:00 - 16:00",
            course: "Ingeniería de Software",
            location: "Lab 302",
            isVirtual: false,
        },
        {
            day: "MAÑANA",
            time: "08:00 - 10:00",
            course: "Base de Datos II",
            location: "Aula Virtual",
            isVirtual: true,
        },
    ];

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Clock size={16} className="text-blue-500" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Próximas Clases
                </h2>
            </div>

            {/* List of Classes */}
            <div className="space-y-4 mb-4">
                {schedule.map((item, idx) => {
                    const LocationIcon = item.isVirtual ? Laptop : MapPin;
                    return (
                        <div key={idx} className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                {item.day}
                            </span>
                            
                            <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3.5 space-y-1.5 shadow-sm/5">
                                <span className="text-xs font-extrabold text-blue-600">
                                    {item.time}
                                </span>
                                <h3 className="font-bold text-sm text-slate-800 leading-snug">
                                    {item.course}
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

            {/* Ver Horario Completo Button */}
            <button className="w-full text-center py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl transition duration-200 shadow-sm flex items-center justify-center gap-1.5">
                <CalendarDays size={14} className="text-slate-400" />
                <span>Ver Horario Completo</span>
            </button>
        </div>
    );
}

export default UpcomingClassesCard;
