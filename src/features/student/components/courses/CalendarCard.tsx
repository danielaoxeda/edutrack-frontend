import type { SesionClase } from "../../../../types/activity";

interface CalendarCardProps {
    sessions: SesionClase[];
}
export default function CalendarCard({ sessions }: CalendarCardProps) {
    const sorted = [...sessions].sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h3 className="font-bold text-slate-700">
                Próximas sesiones
            </h3>

            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {sorted.length > 0 ? (
                    sorted.slice(0, 5).map((ses) => (
                        <div
                            key={ses.id}
                            className="flex justify-between text-sm border-b border-slate-100 py-2"
                        >
                            <span>{ses.tema || "Sesión"}</span>

                            <span className="text-slate-500">
                                {new Date(ses.fecha).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-500 text-sm">
                        No hay sesiones próximas
                    </p>
                )}
            </div>
        </div>
    );
}