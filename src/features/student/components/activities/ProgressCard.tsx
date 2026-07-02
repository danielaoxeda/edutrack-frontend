import type {Actividad} from "../../../../types/activity.ts";

interface ProgressCardProps {
    activities: Actividad[];
}

export default function ProgressCard({ activities }: ProgressCardProps) {
    const total = activities.length;
    const entregadas = activities.filter(a => a.entregas?.length > 0).length;
    const calificadas = activities.filter(a => a.calificado).length;
    const pendientes = total - entregadas;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h3 className="font-bold text-slate-700">Tu progreso</h3>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Pendientes</span>
                    <span className="font-medium">{pendientes}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Entregadas</span>
                    <span className="font-medium">{entregadas}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Calificadas</span>
                    <span className="font-medium">{calificadas}</span>
                </div>
            </div>
        </div>
    );
};