import { useMemo, useState } from "react";
import { BookOpen, GraduationCap, Layers3, Loader2, Plus } from "lucide-react";
import AdminLayout from "../../../layout/AdminLayout";
import {
    assignTeacherToSection,
    createCourse,
    createSection,
    enrollStudentInSection,
} from "../api/adminApi";
import { useAdminOverview } from "../hooks/useAdminOverview";

function AdminCourses() {
    const { overview, loading, error, refresh } = useAdminOverview();
    const [courseForm, setCourseForm] = useState({
        codigo: "",
        nombre: "",
        descripcion: "",
        creditos: 3,
    });
    const [sectionForm, setSectionForm] = useState({
        cursoId: "",
        periodoAcademicoId: "",
        nombre: "",
        capacidad: 30,
    });
    const [assignmentForm, setAssignmentForm] = useState({
        docenteId: "",
        seccionId: "",
    });
    const [enrollmentForm, setEnrollmentForm] = useState({
        estudianteId: "",
        seccionId: "",
    });
    const [busy, setBusy] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

    const topCourses = useMemo(() => {
        return [...(overview?.courses ?? [])]
            .sort((a, b) => b.totalMatriculas - a.totalMatriculas)
            .slice(0, 6);
    }, [overview]);

    const topSections = useMemo(() => {
        return [...(overview?.sections ?? [])]
            .sort((a, b) => b.enrolledCount - a.enrolledCount)
            .slice(0, 6);
    }, [overview]);

    const runAction = async (key: string, action: () => Promise<unknown>, successMessage: string) => {
        setBusy(key);
        setFeedback(null);

        try {
            await action();
            setFeedbackType("success");
            setFeedback(successMessage);
            await refresh();
        } catch (err) {
            setFeedbackType("error");
            setFeedback(err instanceof Error ? err.message : "No se pudo completar la accion");
        } finally {
            setBusy(null);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">
                        Modulo academico
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                        Cursos, secciones y asignaciones
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm text-slate-600">
                        Aqui conectamos el flujo completo: crear cursos, abrir secciones, asignar profesor y matricular estudiantes.
                    </p>
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

                <div className="grid gap-6 xl:grid-cols-3">
                    <section className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                                <BookOpen size={22} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-950">Nuevo curso</h2>
                                <p className="text-sm text-slate-500">Base del catalogo academico.</p>
                            </div>
                        </div>

                        <form
                            className="mt-5 flex flex-1 flex-col gap-4"
                            onSubmit={(event) => {
                                event.preventDefault();
                                void runAction("course", () => createCourse(courseForm), "Curso creado correctamente.");
                            }}
                        >
                            <input
                                required
                                placeholder="Codigo"
                                value={courseForm.codigo}
                                onChange={(event) => setCourseForm((current) => ({ ...current, codigo: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm uppercase outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            <input
                                required
                                placeholder="Nombre del curso"
                                value={courseForm.nombre}
                                onChange={(event) => setCourseForm((current) => ({ ...current, nombre: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            <textarea
                                required
                                placeholder="Descripcion"
                                value={courseForm.descripcion}
                                onChange={(event) => setCourseForm((current) => ({ ...current, descripcion: event.target.value }))}
                                className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            <input
                                required
                                type="number"
                                min={1}
                                max={8}
                                value={courseForm.creditos}
                                onChange={(event) => setCourseForm((current) => ({ ...current, creditos: Number(event.target.value) }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                            />
                            <button className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60" disabled={busy === "course"}>
                                {busy === "course" ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                Crear curso
                            </button>
                        </form>
                    </section>

                    <section className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                                <Layers3 size={22} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-950">Nueva seccion</h2>
                                <p className="text-sm text-slate-500">Oferta academica por periodo.</p>
                            </div>
                        </div>

                        <form
                            className="mt-5 flex flex-1 flex-col gap-4"
                            onSubmit={(event) => {
                                event.preventDefault();
                                void runAction("section", () => createSection({
                                    cursoId: Number(sectionForm.cursoId),
                                    periodoAcademicoId: Number(sectionForm.periodoAcademicoId),
                                    nombre: sectionForm.nombre,
                                    capacidad: Number(sectionForm.capacidad),
                                }), "Seccion creada correctamente.");
                            }}
                        >
                            <select
                                required
                                value={sectionForm.cursoId}
                                onChange={(event) => setSectionForm((current) => ({ ...current, cursoId: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="">Selecciona un curso</option>
                                {(overview?.courses ?? []).map((course) => (
                                    <option key={course.id} value={course.id}>{course.codigo} - {course.nombre}</option>
                                ))}
                            </select>
                            <select
                                required
                                value={sectionForm.periodoAcademicoId}
                                onChange={(event) => setSectionForm((current) => ({ ...current, periodoAcademicoId: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="">Selecciona un periodo</option>
                                {(overview?.periods ?? []).map((period) => (
                                    <option key={period.id} value={period.id}>{period.nombre}</option>
                                ))}
                            </select>
                            <input
                                required
                                placeholder="Nombre de la seccion"
                                value={sectionForm.nombre}
                                onChange={(event) => setSectionForm((current) => ({ ...current, nombre: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                            <input
                                required
                                type="number"
                                min={1}
                                value={sectionForm.capacidad}
                                onChange={(event) => setSectionForm((current) => ({ ...current, capacidad: Number(event.target.value) }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                            <button className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60" disabled={busy === "section"}>
                                {busy === "section" ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                Crear seccion
                            </button>
                        </form>
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                                <GraduationCap size={22} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-950">Asignaciones</h2>
                                <p className="text-sm text-slate-500">Profesor a seccion y alumno a curso.</p>
                            </div>
                        </div>

                        <form
                            className="mt-5 space-y-3"
                            onSubmit={(event) => {
                                event.preventDefault();
                                void runAction("assign", () => assignTeacherToSection({
                                    docenteId: Number(assignmentForm.docenteId),
                                    seccionId: Number(assignmentForm.seccionId),
                                }), "Profesor asignado a la seccion.");
                            }}
                        >
                            <select
                                required
                                value={assignmentForm.docenteId}
                                onChange={(event) => setAssignmentForm((current) => ({ ...current, docenteId: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                            >
                                <option value="">Selecciona un profesor</option>
                                {(overview?.teachers ?? []).map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.fullName}</option>
                                ))}
                            </select>
                            <select
                                required
                                value={assignmentForm.seccionId}
                                onChange={(event) => setAssignmentForm((current) => ({ ...current, seccionId: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                            >
                                <option value="">Selecciona una seccion</option>
                                {(overview?.sections ?? []).map((section) => (
                                    <option key={section.id} value={section.id}>{section.cursoCodigo} - {section.nombre}</option>
                                ))}
                            </select>
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60" disabled={busy === "assign"}>
                                {busy === "assign" ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                Asignar profesor
                            </button>
                        </form>

                        <form
                            className="mt-6 space-y-3 border-t border-slate-100 pt-6"
                            onSubmit={(event) => {
                                event.preventDefault();
                                void runAction("enroll", () => enrollStudentInSection({
                                    estudianteId: Number(enrollmentForm.estudianteId),
                                    seccionId: Number(enrollmentForm.seccionId),
                                    estado: "ACTIVO",
                                }), "Estudiante matriculado correctamente.");
                            }}
                        >
                            <select
                                required
                                value={enrollmentForm.estudianteId}
                                onChange={(event) => setEnrollmentForm((current) => ({ ...current, estudianteId: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                            >
                                <option value="">Selecciona un estudiante</option>
                                {(overview?.students ?? []).map((student) => (
                                    <option key={student.id} value={student.id}>{student.fullName}</option>
                                ))}
                            </select>
                            <select
                                required
                                value={enrollmentForm.seccionId}
                                onChange={(event) => setEnrollmentForm((current) => ({ ...current, seccionId: event.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100"
                            >
                                <option value="">Selecciona una seccion</option>
                                {(overview?.sections ?? []).map((section) => (
                                    <option key={section.id} value={section.id}>{section.cursoCodigo} - {section.nombre}</option>
                                ))}
                            </select>
                            <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 disabled:opacity-60" disabled={busy === "enroll"}>
                                {busy === "enroll" ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                Matricular estudiante
                            </button>
                        </form>
                    </section>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-950">Cursos con mayor demanda</h2>
                                <p className="text-sm text-slate-500">Resumen conectado a cursos, secciones y matriculas.</p>
                            </div>
                            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                {overview?.courses.length ?? 0} cursos
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {loading ? (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">Cargando cursos...</div>
                            ) : topCourses.map((course) => (
                                <article key={course.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{course.codigo}</p>
                                            <h3 className="mt-1 text-lg font-bold text-slate-900">{course.nombre}</h3>
                                            <p className="mt-2 text-sm text-slate-600">{course.descripcion}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                                            <span className="rounded-full bg-white px-3 py-1 text-slate-700">{course.creditos} creditos</span>
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">{course.seccionesCount} secciones</span>
                                            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">{course.totalMatriculas} matriculas</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-950">Secciones activas</h2>
                                <p className="text-sm text-slate-500">Ocupacion, docentes asignados y periodo.</p>
                            </div>
                            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                {overview?.sections.length ?? 0} secciones
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {loading ? (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm text-slate-500">Cargando secciones...</div>
                            ) : topSections.map((section) => (
                                <article key={section.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">{section.cursoCodigo} · {section.cursoNombre}</h3>
                                            <p className="text-sm text-slate-500">{section.nombre} · {section.periodoNombre}</p>
                                            <p className="mt-2 text-sm text-slate-600">
                                                Docentes: {section.docentes.length > 0 ? section.docentes.join(", ") : "Sin asignar"}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                                            <span className="rounded-full bg-white px-3 py-1 text-slate-700">{section.enrolledCount}/{section.capacidad}</span>
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">ocupacion real</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminCourses;
