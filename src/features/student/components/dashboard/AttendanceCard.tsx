interface Props {
    attendancePercent?: number | null;
}

function AttendanceCard({ attendancePercent }: Props) {
    const displayValue = attendancePercent == null ? "--" : `${attendancePercent}%`;
    const barHeight = attendancePercent == null ? 0 : Math.max(8, attendancePercent);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-500 mb-4">
                Porcentaje de asistencia
            </p>

            <div className="flex items-end gap-2 h-32">
                <div className="bg-slate-300 w-full h-[80%] rounded-t"></div>
                <div className="bg-slate-300 w-full h-[65%] rounded-t"></div>
                <div className="bg-slate-300 w-full h-[90%] rounded-t"></div>
                <div
                    className="bg-blue-700 w-full rounded-t transition-all"
                    style={{ height: `${barHeight}%` }}
                />
            </div>

            <h3 className="text-4xl font-bold mt-4">
                {displayValue}
            </h3>
        </div>
    );
}

export default AttendanceCard;
