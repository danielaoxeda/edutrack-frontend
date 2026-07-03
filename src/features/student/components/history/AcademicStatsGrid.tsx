import {
    ClipboardCheck,
    Clock3,
    AlertTriangle,
    Award,
} from "lucide-react";

import type { AcademicStats } from "../../../../types/academicHistory";

interface Props {
    stats: AcademicStats;
}

interface CardProps {
    title: string;
    value: number | string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
}

function StatCard({
                      title,
                      value,
                      subtitle,
                      icon,
                      color,
                  }: CardProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                        {value}
                    </h2>

                    <p className="text-xs text-slate-400 mt-2">
                        {subtitle}
                    </p>

                </div>

                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default function AcademicStatsGrid({
                                              stats,
                                          }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
                title="Entregadas"
                value={stats.entregadas}
                subtitle="Actividades enviadas"
                color="bg-emerald-100 text-emerald-700"
                icon={<ClipboardCheck size={22} />}
            />

            <StatCard
                title="Pendientes"
                value={stats.pendientes}
                subtitle="Por entregar"
                color="bg-amber-100 text-amber-700"
                icon={<Clock3 size={22} />}
            />

            <StatCard
                title="Alertas"
                value={stats.alertas}
                subtitle="Académicas registradas"
                color="bg-red-100 text-red-700"
                icon={<AlertTriangle size={22} />}
            />

            <StatCard
                title="Calificadas"
                value={stats.calificadas}
                subtitle="Entregas con nota"
                color="bg-blue-100 text-blue-700"
                icon={<Award size={22} />}
            />

        </div>
    );
}
