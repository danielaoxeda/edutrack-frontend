import type {Activity} from "../../../../types/activity.ts";

interface CalendarCardProps {
    activities: Activity[];
}

function CalendarCard({ activities }: CalendarCardProps) {
    // Podemos agrupar por fecha o simplemente mostrar las próximas
    const upcoming = activities
        .filter(a => new Date(a.fechaLimite) >= new Date())
        .sort((a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime())
        .slice(0, 5);

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-700 mb-4">Calendario</h3>
            {upcoming.length === 0 ? (
                <p className="text-slate-500">No hay próximas fechas</p>
            ) : (
                <ul className="space-y-3">
                    {upcoming.map((a) => (
                        <li key={a.id} className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="text-sm">{a.titulo}</span>
                            <span className="text-sm text-slate-500">
                {new Date(a.fechaLimite).toLocaleDateString('es-ES')}
              </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CalendarCard;