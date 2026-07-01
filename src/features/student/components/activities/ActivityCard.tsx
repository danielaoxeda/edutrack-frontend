import type {Activity} from "../../../../types/activity.ts";

function ActivityCard({ titulo, cursoNombre, fechaLimite, estado }: Activity) {
    const isPast = new Date(fechaLimite) < new Date();
    const statusColor =
        estado === 'Entregado' ? 'text-green-600 bg-green-100' :
            estado === 'Calificado' ? 'text-blue-600 bg-blue-100' :
                isPast ? 'text-red-600 bg-red-100' : 'text-yellow-600 bg-yellow-100';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition">
            <div>
                <h4 className="font-bold text-slate-800">{titulo}</h4>
                <p className="text-sm text-slate-500">{cursoNombre}</p>
            </div>
            <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-600">
          {new Date(fechaLimite).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {estado}
        </span>
            </div>
        </div>
    );
}

export default ActivityCard;