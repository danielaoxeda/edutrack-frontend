import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

function CalendarCard() {
    const days = [
        "L",
        "M",
        "M",
        "J",
        "V",
        "S",
        "D",
    ];

    const dates = [
        27,
        28,
        29,
        30,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                    Calendario Octubre
                </h3>

                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition">
                        <ChevronLeft size={18} />
                    </button>

                    <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* DÍAS */}
            <div className="grid grid-cols-7 gap-2 text-center mb-3">
                {days.map((day) => (
                    <div
                        key={day}
                        className="text-xs font-bold text-slate-400 uppercase py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* FECHAS */}
            <div className="grid grid-cols-7 gap-2 text-center">
                {dates.map((date) => (
                    <div
                        key={date}
                        className={`
              h-10 flex items-center justify-center
              rounded-xl text-sm font-medium transition

              ${
                            date === 7
                                ? "bg-blue-700 text-white"
                                : date === 12
                                    ? "border-2 border-red-500 text-red-500"
                                    : "hover:bg-slate-100"
                        }
            `}
                    >
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CalendarCard;