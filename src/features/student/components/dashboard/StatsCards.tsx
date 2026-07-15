import { TrendingUp } from "lucide-react";

interface Props {
    averageGrade?: number | null;
}

function StatsCard({ averageGrade }: Props) {
    const displayValue = averageGrade == null ? "--" : averageGrade.toFixed(1);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex justify-between">
                <div>
                    <p className="text-slate-500 mb-2">
                        Rendimiento académico
                    </p>

                    <h3 className="text-5xl font-bold text-blue-700">
                        {displayValue}
                    </h3>
                </div>

                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-blue-700" />
                </div>
            </div>
        </div>
    );
}

export default StatsCard;
