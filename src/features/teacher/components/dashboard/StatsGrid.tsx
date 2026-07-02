import { BookOpen, Users, FileText, GraduationCap, TrendingUp } from "lucide-react";
import type { StatItem } from "../../data/teacherDashboardData";

interface StatsGridProps {
    stats: StatItem[];
}

const iconMap: Record<string, any> = {
    BookOpen: {
        icon: BookOpen,
        bg: "bg-blue-50 text-blue-600 border-blue-100",
    },
    Users: {
        icon: Users,
        bg: "bg-violet-50 text-violet-600 border-violet-100",
    },
    FileText: {
        icon: FileText,
        bg: "bg-amber-50 text-amber-600 border-amber-100",
    },
    GraduationCap: {
        icon: GraduationCap,
        bg: "bg-rose-50 text-rose-600 border-rose-100",
    },
    TrendingUp: {
        icon: TrendingUp,
        bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
};

function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
            {stats.map((stat) => {
                const config = iconMap[stat.iconName] || iconMap.BookOpen;
                const IconComponent = config.icon;

                return (
                    <div
                        key={stat.label}
                        className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="space-y-1.5">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                                {stat.label}
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
                                    {stat.value}
                                </span>
                                {stat.subtext && (
                                    <span className="text-sm font-semibold text-slate-400">
                                        {stat.subtext}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={`p-3 rounded-xl border ${config.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                            <IconComponent size={20} className="stroke-[2.25]" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default StatsGrid;
