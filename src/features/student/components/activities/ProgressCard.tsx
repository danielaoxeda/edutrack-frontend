interface ProgressCardProps {
    total: number;
    completed: number;
}

function ProgressCard({ total, completed }: ProgressCardProps) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-700">Progreso</h3>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{percentage}%</p>
            <p className="text-sm text-slate-500">{completed} de {total} actividades completadas</p>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}

export default ProgressCard;