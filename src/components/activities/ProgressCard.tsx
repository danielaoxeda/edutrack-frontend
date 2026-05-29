import { BarChart3 } from "lucide-react";

function ProgressCard() {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 h-full flex flex-col justify-between">
            <div className="flex justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="text-blue-700" />
                </div>

                <span className="text-sm font-semibold text-blue-700">
          Semestre 2026-1
        </span>
            </div>

            <div className="mt-10">
                <h2 className="text-5xl font-extrabold">
                    60%
                </h2>

                <p className="text-slate-500 mt-2">
                    Progreso total de tareas
                </p>

                <div className="w-full h-3 bg-slate-200 rounded-full mt-6 overflow-hidden">
                    <div className="h-full w-[85%] bg-blue-700 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default ProgressCard;