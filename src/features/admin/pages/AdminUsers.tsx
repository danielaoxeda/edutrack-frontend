import { useMemo, useState } from "react";
import { GraduationCap, Loader2, Plus, Users, X } from "lucide-react";
import AdminLayout from "../../../layout/AdminLayout";
import { createStudent, createTeacher } from "../api/adminApi";
import { useAdminOverview } from "../hooks/useAdminOverview";

type CreationMode = "teacher" | "student";

function AdminUsers() {
    const { overview, loading, error, refresh } = useAdminOverview();
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<CreationMode>("teacher");
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

    const [teacherForm, setTeacherForm] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        password: "",
        codigoDocente: "",
        especialidad: "",
        estado: "ACTIVO",
    });

    const [studentForm, setStudentForm] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        password: "",
        codigoEstudiante: "",
        estado: "ACTIVO",
        estadoAcademico: "REGULAR",
    });

    const query = search.trim().toLowerCase();

    const filteredTeachers = useMemo(() => {
        const source = overview?.teachers ?? [];
        if (!query) {
            return source;
        }

        return source.filter((teacher) =>
            [teacher.fullName, teacher.email, teacher.codigoDocente, teacher.especialidad]
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [overview, query]);

    const filteredStudents = useMemo(() => {
        const source = overview?.students ?? [];
        if (!query) {
            return source;
        }

        return source.filter((student) =>
            [student.fullName, student.email, student.codigoEstudiante, student.estadoAcademico]
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [overview, query]);

    const openModal = (nextMode: CreationMode) => {
        setMode(nextMode);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSaving(false);
    };

    const handleTeacherSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        setFeedback(null);

        try {
            await createTeacher({
                usuario: {
                    nombres: teacherForm.nombres,
                    apellidos: teacherForm.apellidos,
                    email: teacherForm.email,
                    password: teacherForm.password,
                    estado: teacherForm.estado,
                },
                codigoDocente: teacherForm.codigoDocente,
                especialidad: teacherForm.especialidad,
            });

            setFeedbackType("success");
            setFeedback("Profesor creado y enlazado con rol DOCENTE.");
            setTeacherForm({
                nombres: "",
                apellidos: "",
                email: "",
                password: "",
                codigoDocente: "",
                especialidad: "",
                estado: "ACTIVO",
            });
            closeModal();
            await refresh();
        } catch (err) {
            setFeedbackType("error");
            setFeedback(err instanceof Error ? err.message : "No se pudo crear el profesor");
            setSaving(false);
        }
    };

    const handleStudentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        setFeedback(null);

        try {
            await createStudent({
                usuario: {
                    nombres: studentForm.nombres,
                    apellidos: studentForm.apellidos,
                    email: studentForm.email,
                    password: studentForm.password,
                    estado: studentForm.estado,
                },
                codigoEstudiante: studentForm.codigoEstudiante,
                estadoAcademico: studentForm.estadoAcademico,
            });

            setFeedbackType("success");
            setFeedback("Alumno creado y enlazado con rol ESTUDIANTE.");
            setStudentForm({
                nombres: "",
                apellidos: "",
                email: "",
                password: "",
                codigoEstudiante: "",
                estado: "ACTIVO",
                estadoAcademico: "REGULAR",
            });
            closeModal();
            await refresh();
        } catch (err) {
            setFeedbackType("error");
            setFeedback(err instanceof Error ? err.message : "No se pudo crear el alumno");
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-4xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                            Administracion de usuarios
                        </p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                            Profesores, cuentas y perfiles
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Desde aqui dejamos listo el alta de profesores y alumnos, y revisamos el estado real de sus perfiles registrados.
                        </p>
                    </div>

                    <div className="flex flex-col items-stretch gap-3 md:items-end">
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => openModal("teacher")}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                            >
                                <Plus size={16} />
                                Nuevo profesor
                            </button>
                            <button
                                type="button"
                                onClick={() => openModal("student")}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
                            >
                                <Plus size={16} />
                                Nuevo alumno
                            </button>
                        </div>

                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar por nombre, correo o codigo"
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 md:min-w-[420px]"
                        />
                    </div>
                </div>

                {error && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {error}
                    </div>
                )}

                {feedback && (
                    <div className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                        feedbackType === "success"
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border border-rose-200 bg-rose-50 text-rose-700"
                    }`}>
                        {feedback}
                    </div>
                )}

                <div className="grid gap-6 xl:grid-cols-2">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-950">Profesores registrados</h2>
                                <p className="text-sm text-slate-500">Vista rapida de docentes ya vinculados al sistema.</p>
                            </div>
                            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                {overview?.teachers.length ?? 0} docentes
                            </div>
                        </div>

                        {loading ? (
                            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
                                Cargando profesores...
                            </div>
                        ) : filteredTeachers.length === 0 ? (
                            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">
                                No hay profesores que coincidan con la busqueda.
                            </div>
                        ) : (
                            <div className="mt-6 space-y-3">
                                {filteredTeachers.map((teacher) => (
                                    <article key={teacher.id} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="text-base font-bold text-slate-900">{teacher.fullName}</h3>
                                                <p className="text-sm text-slate-500">{teacher.email}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs font-bold">
                                                <span className="rounded-full bg-slate-900 px-3 py-1 text-white">{teacher.codigoDocente}</span>
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">{teacher.especialidad}</span>
                                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                                                    {teacher.assignedSections} secciones
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                                    <Users size={22} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-950">Alumnos registrados</h2>
                                    <p className="text-sm text-slate-500">Lista real de estudiantes creados en la plataforma.</p>
                                </div>
                            </div>
                            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                {overview?.students.length ?? 0} alumnos
                            </div>
                        </div>

                        <div className="mt-6 overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                    <tr>
                                        <th className="pb-3 font-bold">Alumno</th>
                                        <th className="pb-3 font-bold">Codigo</th>
                                        <th className="pb-3 font-bold">Estado academico</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={3} className="py-6 text-slate-500">Cargando alumnos...</td>
                                        </tr>
                                    ) : filteredStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="py-6 text-slate-500">No hay alumnos que coincidan con la busqueda.</td>
                                        </tr>
                                    ) : filteredStudents.slice(0, 8).map((student) => (
                                        <tr key={student.id}>
                                            <td className="py-4 pr-4">
                                                <div className="font-semibold text-slate-900">{student.fullName}</div>
                                                <div className="text-xs text-slate-500">{student.email}</div>
                                            </td>
                                            <td className="py-4 pr-4 text-slate-700">{student.codigoEstudiante}</td>
                                            <td className="py-4">
                                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                                    {student.estadoAcademico}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="user-creation-title"
                            className="w-full max-w-3xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                                        Nuevo registro
                                    </p>
                                    <h2 id="user-creation-title" className="mt-2 text-2xl font-black text-slate-950">
                                        {mode === "teacher" ? "Crear profesor" : "Crear alumno"}
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Cerrar formulario"
                                    onClick={closeModal}
                                    className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMode("teacher")}
                                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition ${
                                        mode === "teacher"
                                            ? "bg-slate-950 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    <GraduationCap size={16} />
                                    Profesor
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode("student")}
                                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition ${
                                        mode === "student"
                                            ? "bg-slate-950 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    <Users size={16} />
                                    Alumno
                                </button>
                            </div>

                            {mode === "teacher" ? (
                                <form onSubmit={handleTeacherSubmit} className="mt-6 space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            required
                                            value={teacherForm.nombres}
                                            onChange={(event) => setTeacherForm((current) => ({ ...current, nombres: event.target.value }))}
                                            placeholder="Nombres"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                        <input
                                            required
                                            value={teacherForm.apellidos}
                                            onChange={(event) => setTeacherForm((current) => ({ ...current, apellidos: event.target.value }))}
                                            placeholder="Apellidos"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        value={teacherForm.email}
                                        onChange={(event) => setTeacherForm((current) => ({ ...current, email: event.target.value }))}
                                        placeholder="Correo institucional"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            required
                                            type="password"
                                            value={teacherForm.password}
                                            onChange={(event) => setTeacherForm((current) => ({ ...current, password: event.target.value }))}
                                            placeholder="Contrasena inicial"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                        <select
                                            value={teacherForm.estado}
                                            onChange={(event) => setTeacherForm((current) => ({ ...current, estado: event.target.value }))}
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        >
                                            <option value="ACTIVO">Activo</option>
                                            <option value="INACTIVO">Inactivo</option>
                                            <option value="SUSPENDIDO">Suspendido</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            required
                                            value={teacherForm.codigoDocente}
                                            onChange={(event) => setTeacherForm((current) => ({ ...current, codigoDocente: event.target.value }))}
                                            placeholder="Codigo docente"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm uppercase outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                        <input
                                            required
                                            value={teacherForm.especialidad}
                                            onChange={(event) => setTeacherForm((current) => ({ ...current, especialidad: event.target.value }))}
                                            placeholder="Especialidad"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                        {saving ? "Creando profesor..." : "Crear profesor"}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleStudentSubmit} className="mt-6 space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            required
                                            value={studentForm.nombres}
                                            onChange={(event) => setStudentForm((current) => ({ ...current, nombres: event.target.value }))}
                                            placeholder="Nombres"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                        <input
                                            required
                                            value={studentForm.apellidos}
                                            onChange={(event) => setStudentForm((current) => ({ ...current, apellidos: event.target.value }))}
                                            placeholder="Apellidos"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        value={studentForm.email}
                                        onChange={(event) => setStudentForm((current) => ({ ...current, email: event.target.value }))}
                                        placeholder="Correo institucional"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            required
                                            type="password"
                                            value={studentForm.password}
                                            onChange={(event) => setStudentForm((current) => ({ ...current, password: event.target.value }))}
                                            placeholder="Contrasena inicial"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                        <input
                                            required
                                            value={studentForm.codigoEstudiante}
                                            onChange={(event) => setStudentForm((current) => ({ ...current, codigoEstudiante: event.target.value }))}
                                            placeholder="Codigo estudiante"
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm uppercase outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <select
                                            value={studentForm.estado}
                                            onChange={(event) => setStudentForm((current) => ({ ...current, estado: event.target.value }))}
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        >
                                            <option value="ACTIVO">Activo</option>
                                            <option value="INACTIVO">Inactivo</option>
                                            <option value="SUSPENDIDO">Suspendido</option>
                                        </select>
                                        <select
                                            value={studentForm.estadoAcademico}
                                            onChange={(event) => setStudentForm((current) => ({ ...current, estadoAcademico: event.target.value }))}
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        >
                                            <option value="REGULAR">Regular</option>
                                            <option value="OBSERVADO">Observado</option>
                                            <option value="CONDICIONADO">Condicionado</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                        {saving ? "Creando alumno..." : "Crear alumno"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default AdminUsers;
