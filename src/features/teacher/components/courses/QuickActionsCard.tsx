import { CloudUpload, UserCheck, FileEdit, FileSpreadsheet } from "lucide-react";

function QuickActionsCard() {
    const actions = [
        {
            label: "Subir Material",
            icon: CloudUpload,
            color: "text-blue-600 bg-blue-50 border-blue-100",
        },
        {
            label: "Asistencia",
            icon: UserCheck,
            color: "text-emerald-600 bg-emerald-50 border-emerald-100",
        },
        {
            label: "Publicar Tarea",
            icon: FileEdit,
            color: "text-amber-600 bg-amber-50 border-amber-100",
        },
        {
            label: "Calificaciones",
            icon: FileSpreadsheet,
            color: "text-violet-600 bg-violet-50 border-violet-100",
        },
    ];

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            {/* Header */}
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100">
                Accesos Rápidos
            </h2>

            {/* Grid layout */}
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

export default QuickActionsCard;
