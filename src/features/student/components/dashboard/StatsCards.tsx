import { TrendingUp } from "lucide-react";

function StatsCard() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex justify-between">
                <div>
                    <p className="text-slate-500 mb-2">
                        Rendimiento académico
                    </p>

                    <h3 className="text-5xl font-bold text-blue-700">
                        18.4
                    </h3>
                </div>

                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-blue-700" />
                </div>
            </div>

            <div className="mt-4 inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                +1.2 respecto al ciclo anterior
            </div>
        </div>
    );
}

export default StatsCard;