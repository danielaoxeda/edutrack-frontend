import { FileSpreadsheet, Upload, Calculator, AlertTriangle, PieChart } from "lucide-react";

interface GradeSidebarWidgetsProps {
    distribution: Array<{
        label: string;
        count: number;
        percent: number;
        color: string;
        bgBadge: string;
    }>;
}

export function GradeQuickActionsCard() {
    const actions = [
        { label: "Generar Acta", icon: FileSpreadsheet, color: "text-blue-600 bg-blue-50 border-blue-100" },
        { label: "Carga Masiva", icon: Upload, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
        { label: "Configurar Pesos", icon: Calculator, color: "text-amber-600 bg-amber-50 border-amber-100" },
        { label: "Reportar Alerta", icon: AlertTriangle, color: "text-violet-600 bg-violet-50 border-violet-100" },
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

export function GradeDistributionCard({ distribution }: GradeSidebarWidgetsProps) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <PieChart size={16} className="text-blue-500" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Distribución de Notas
                </h2>
            </div>

            <div className="space-y-4">
                {distribution.map((dist, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-700">
                                {dist.label}
                            </span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${dist.bgBadge}`}>
                                {dist.count} alu.
                            </span>
                        </div>

                        <div className="relative w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/20">
                            <div
                                className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${dist.color} transition-all duration-700 ease-out`}
                                style={{ width: `${dist.percent}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
            </div>
        </div>
    );
}
