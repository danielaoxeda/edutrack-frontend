import {
    CheckCircle,
    Clock3,
    Upload,
} from "lucide-react";

interface Props {
    title: string;
    description: string;
    date: string;
    status: "entregado" | "pendiente" | "calificado";
}

function ActivityCard({
                          title,
                          description,
                          date,
                          status,
                      }: Props) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition">
            <div>
                <h3 className="font-bold text-lg">
                    {title}
                </h3>

                <p className="text-slate-500">
                    {description}
                </p>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-xs uppercase text-slate-400 font-bold">
                        Fecha límite
                    </p>

                    <p className="font-medium">
                        {date}
                    </p>
                </div>

                {status === "entregado" && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                        <CheckCircle size={16} />
                        Entregado
                    </div>
                )}

                {status === "pendiente" && (
                    <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                        <Clock3 size={16} />
                        Pendiente
                    </button>
                )}

                {status === "calificado" && (
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                        <Upload size={16} />
                        Calificado
                    </button>
                )}
            </div>
        </div>
    );
}

export default ActivityCard;