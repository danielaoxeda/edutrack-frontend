import { ChevronRight } from "lucide-react";

interface Props {
    title: string;
    professor: string;
    progress: number;
    color: string;
}

function CourseCard({
                        title,
                        professor,
                        progress,
                        color,
                    }: Props) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-5 hover:shadow-lg transition">
            <div
                className={`w-16 h-16 rounded-xl ${color}`}
            />

            <div className="flex-1">
                <div className="flex justify-between mb-2">
                    <div>
                        <h3 className="font-bold text-lg">
                            {title}
                        </h3>

                        <p className="text-slate-500">
                            {professor}
                        </p>
                    </div>

                    <span className="font-bold text-blue-700">
            {progress}%
          </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                        className="bg-blue-700 h-2 rounded-full"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                <ChevronRight />
            </button>
        </div>
    );
}

export default CourseCard;