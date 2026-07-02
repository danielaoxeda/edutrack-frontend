import type { Actividad } from "../../../../types/activity";
import { toActivityCardProps } from "../../../../adapters/activityAdapter";

interface HeroCardProps {
    activity: Actividad;
}

export default function HeroCard({ activity }: HeroCardProps) {
    const props = toActivityCardProps(activity);

    return (
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
            <p className="text-sm font-medium opacity-80">PRÓXIMO VENCIMIENTO</p>
            <h2 className="text-2xl font-bold mt-2">{props.title}</h2>
            <p className="text-sm opacity-90 mt-1">{props.courseName}</p>
            <div className="mt-4 flex items-center gap-2">
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
          {props.deadline}
        </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
          {props.status}
        </span>
            </div>
        </div>
    );
};