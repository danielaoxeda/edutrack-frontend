import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import {useAuth} from "../../../../context/AuthContext.tsx";
import {studentService} from "../../../../services/studentService.ts";

function ProfileCard() {
    const { estudianteId } = useAuth();

    const [student, setStudent] = useState<any>(null);

    useEffect(() => {
        const loadStudent = async () => {
            if (!estudianteId) return;

            const data = await studentService.getStudentById(estudianteId);
            setStudent(data);
        };

        loadStudent();
    }, [estudianteId]);

    if (!student) {
        return (
            <div className="p-8 text-slate-500">
                Cargando perfil...
            </div>
        );
    }

    return (
        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

            {/* HEADER */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Perfil del estudiante
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Información académica y personal (solo lectura)
                    </p>
                </div>
            </div>

            {/* INFO PRINCIPAL */}
            <div className="md:col-span-2 flex items-center gap-6 mb-8">

                <div className="relative">
                    <img
                        src="/user.png"
                        alt="user"
                        className="w-10 h-10 rounded-full"
                    />

                    <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                        <Camera size={16} />
                    </button>
                </div>

                <div>
                    <h3 className="font-bold text-lg">
                        {student.usuario.nombres} {student.usuario.apellidos}
                    </h3>

                    <p className="text-slate-500 text-sm">
                        Estado: {student.estadoAcademico}
                    </p>

                    <p className="text-blue-700 text-sm mt-1">
                        Código: {student.codigoEstudiante}
                    </p>
                </div>
            </div>

            {/* CAMPOS SOLO LECTURA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="text-xs font-bold uppercase text-slate-500">
                        Nombres
                    </label>

                    <input
                        value={student.usuario.nombres}
                        disabled
                        className="w-full rounded-xl border bg-slate-100 p-3 text-slate-500"
                    />
                </div>

                <div>
                    <label className="text-xs font-bold uppercase text-slate-500">
                        Apellidos
                    </label>

                    <input
                        value={student.usuario.apellidos}
                        disabled
                        className="w-full rounded-xl border bg-slate-100 p-3 text-slate-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-slate-500">
                        Correo institucional
                    </label>

                    <input
                        value={student.usuario.email}
                        disabled
                        className="w-full rounded-xl border bg-slate-100 p-3 text-slate-500"
                    />
                </div>
            </div>

        </section>
    );
}

export default ProfileCard;