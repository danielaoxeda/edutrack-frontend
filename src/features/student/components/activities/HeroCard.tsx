import type {Activity} from "../../../../types/activity.ts";

interface HeroCardProps {
    nextActivity: Activity | null;
}

function HeroCard({ nextActivity }: HeroCardProps) {
    if (!nextActivity) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-700 mb-2">Próximo vencimiento</h3>
                <p className="text-slate-500">No hay actividades pendientes próximas.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Próximo vencimiento</h3>
            <h2 className="text-2xl font-bold mt-2">{nextActivity.cursoNombre}</h2>
            <p className="text-slate-700 mt-1">{nextActivity.titulo}</p>
            <div className="mt-4 flex items-center gap-4">
        <span className="text-sm font-medium text-red-500">
          {new Date(nextActivity.fechaLimite).toLocaleString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
          })}
        </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
                    Subir archivos
                </button>
            </div>
        </div>
    );
}

export default HeroCard;