import {
    MessageCircle,
} from "lucide-react";

function SupportCard() {
    return (
        <div className="bg-slate-200 rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center gap-6 h-full">
            {/* INFO */}
            <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    ¿Necesitas ayuda con tu entrega?
                </h3>

                <p className="text-slate-600 mb-6 max-w-2xl">
                    Contacta a tu tutor académico para
                    resolver dudas técnicas sobre el envío
                    de archivos o problemas con las
                    actividades.
                </p>

                {/* AVATARES */}
                <div className="flex -space-x-3">
                    <img
                        src="/tutor1.png"
                        alt="Tutor"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />

                    <img
                        src="/tutor2.png"
                        alt="Tutor"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />

                    <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                        +4
                    </div>
                </div>
            </div>

            {/* BOTÓN */}
            <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 whitespace-nowrap">
                <MessageCircle size={18} />

                Chat de soporte
            </button>
        </div>
    );
}

export default SupportCard;