function AttendanceCard() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-500 mb-4">
                Porcentaje de asistencia
            </p>

            <div className="flex items-end gap-2 h-32">
                <div className="bg-slate-300 w-full h-[80%] rounded-t"></div>
                <div className="bg-slate-300 w-full h-[65%] rounded-t"></div>
                <div className="bg-slate-300 w-full h-[90%] rounded-t"></div>
                <div className="bg-blue-700 w-full h-[96%] rounded-t"></div>
            </div>

            <h3 className="text-4xl font-bold mt-4">
                96.2%
            </h3>
        </div>
    );
}

export default AttendanceCard;