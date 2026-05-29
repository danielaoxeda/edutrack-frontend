import { Upload } from "lucide-react";

function HeroCard() {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-blue-700 text-white p-8 min-h-80 flex flex-col justify-between">
            <div>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
          Próximo vencimiento
        </span>

                <h2 className="text-4xl font-bold mt-6 mb-3">
                    Desarrollo Web Full Stack
                </h2>

                <p className="text-white/80 max-w-144">
                    Proyecto Final: Implementación de
                    Microservicios con Node.js y React.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-10">
                <div>
                    <p className="text-sm text-white/70">
                        Fecha límite
                    </p>

                    <p className="font-bold">
                        Mañana, 23:59
                    </p>
                </div>

                <button className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-slate-100 transition">
                    <Upload size={18} />

                    Subir archivos
                </button>
            </div>
        </div>
    );
}

export default HeroCard;