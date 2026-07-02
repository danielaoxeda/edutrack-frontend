import type {ActivityCardProps} from "../../../../types/ui.ts";

const ActivityCard: React.FC<ActivityCardProps> = ({
                                                       courseName,
                                                       title,
                                                       deadline,
                                                       status,
                                                   }) => {
    const statusColors = {
        Pendiente: 'text-yellow-600 bg-yellow-100',
        Entregado: 'text-green-600 bg-green-100',
        Calificado: 'text-blue-600 bg-blue-100',
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <p className="text-sm font-medium text-slate-500">{courseName}</p>
                <h4 className="text-lg font-bold text-slate-900">{title}</h4>
                <p className="text-sm text-slate-500 mt-1">
                    FECHA LÍMITE: {new Date(deadline).toLocaleDateString('es-ES')}
                </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
        {status}
      </span>
        </div>
    );
};

export default ActivityCard;