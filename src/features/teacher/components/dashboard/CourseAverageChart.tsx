import { BarChart3 } from "lucide-react";
import { courseAveragesData } from "../../data/teacherDashboardData";

function CourseAverageChart() {
    const maxGrade = 5.0;

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <BarChart3 size={18} className="text-blue-600" />
                <h2 className="text-lg font-bold text-slate-800">
                    Promedio por Curso
                </h2>
            </div>

            {/* Chart Body */}
            <div className="flex-1 flex flex-col justify-around space-y-4">
                {courseAveragesData.map((item) => {
                    const percentage = (item.average / maxGrade) * 100;
                    
                    // Determine colors based on average grade
                    let barColor = "from-emerald-500 to-teal-600";
                    let bgBadge = "bg-emerald-50 text-emerald-700 border-emerald-100";
                    if (item.average < 4.0) {
                        barColor = "from-amber-500 to-orange-600";
                        bgBadge = "bg-amber-50 text-amber-700 border-amber-100";
                    }

                    return (
                        <div key={item.course} className="space-y-1">
                            {/* Course name and average number */}
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-700">
                                    {item.course}
                                </span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${bgBadge}`}>
                                    {item.average.toFixed(1)} / 5.0
                                </span>
                            </div>

                            {/* Bar Container */}
                            <div className="relative w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/20">
                                <div
                                    className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-700 ease-out`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Grid Line Labels */}
            <div className="mt-6 border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>0.0</span>
                <span>2.5 (Aprobado)</span>
                <span>4.0</span>
                <span>5.0</span>
            </div>
        </div>
    );
}

export default CourseAverageChart;
