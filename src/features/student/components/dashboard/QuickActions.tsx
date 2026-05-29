import {
    BookOpen,
    Users,
} from "lucide-react";

function QuickActions() {
    return (
        <div className="bg-slate-900 text-white rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
                Fast Track
            </h3>

            <p className="text-slate-400 mb-6">
                Acceso rápido a tus herramientas
            </p>

            <div className="grid grid-cols-2 gap-4">
                <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col gap-2">
                    <BookOpen />
                    Biblioteca
                </button>

                <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex flex-col gap-2">
                    <Users />
                    Correo EduTrack
                </button>
            </div>
        </div>
    );
}

export default QuickActions;