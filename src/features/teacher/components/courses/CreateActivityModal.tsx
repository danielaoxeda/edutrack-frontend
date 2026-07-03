import { useState } from "react";
import { Loader2, X } from "lucide-react";
import type { TeacherActivityOption, TeacherActivityPayload } from "../../api/teacherWorkspaceApi";

type CreateActivityModalProps = {
    options: TeacherActivityOption[];
    saving: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (payload: TeacherActivityPayload) => Promise<void>;
};

function CreateActivityModal({ options, saving, error, onClose, onSubmit }: CreateActivityModalProps) {
    const [form, setForm] = useState({
        seccionId: options[0]?.seccionId ?? 0,
        numeroSemana: 1,
        titulo: "",
        descripcion: "",
        tipo: "TAREA" as TeacherActivityPayload["tipo"],
        fechaLimite: "",
        calificada: true,
        notaMaxima: 5,
        visible: true,
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-activity-title"
                className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-600">Planificacion academica</p>
                        <h2 id="create-activity-title" className="mt-2 text-2xl font-black text-slate-950">Crear actividad</h2>
                        <p className="mt-1 text-sm text-slate-500">Publica una tarea o evaluacion en una de tus secciones.</p>
                    </div>
                    <button type="button" aria-label="Cerrar formulario" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                        <X size={18} />
                    </button>
                </div>

                {error && (
                    <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {error}
                    </div>
                )}

                <form
                    className="mt-6 space-y-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        void onSubmit({
                            ...form,
                            fechaLimite: `${form.fechaLimite}:00`,
                        });
                    }}
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-1.5 text-sm font-bold text-slate-700">
                            Curso y seccion
                            <select required value={form.seccionId} onChange={(event) => setForm((current) => ({ ...current, seccionId: Number(event.target.value) }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100">
                                {options.map((option) => (
                                    <option key={option.seccionId} value={option.seccionId}>
                                        {option.cursoCodigo} - {option.cursoNombre} / {option.seccionNombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="space-y-1.5 text-sm font-bold text-slate-700">
                            Semana academica
                            <input required type="number" min={1} max={24} value={form.numeroSemana} onChange={(event) => setForm((current) => ({ ...current, numeroSemana: Number(event.target.value) }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
                        </label>
                    </div>

                    <label className="block space-y-1.5 text-sm font-bold text-slate-700">
                        Titulo
                        <input required maxLength={100} value={form.titulo} onChange={(event) => setForm((current) => ({ ...current, titulo: event.target.value }))} placeholder="Ej. Proyecto de APIs REST" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
                    </label>

                    <label className="block space-y-1.5 text-sm font-bold text-slate-700">
                        Descripcion
                        <textarea value={form.descripcion} onChange={(event) => setForm((current) => ({ ...current, descripcion: event.target.value }))} placeholder="Indicaciones, entregables y criterios generales" className="min-h-24 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-1.5 text-sm font-bold text-slate-700">
                            Tipo
                            <select value={form.tipo} onChange={(event) => setForm((current) => ({ ...current, tipo: event.target.value as TeacherActivityPayload["tipo"] }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100">
                                <option value="TAREA">Tarea</option>
                                <option value="PRACTICA">Practica</option>
                                <option value="PC">Practica calificada</option>
                                <option value="PROYECTO">Proyecto</option>
                                <option value="EXAMEN">Examen</option>
                            </select>
                        </label>
                        <label className="space-y-1.5 text-sm font-bold text-slate-700">
                            Fecha limite
                            <input required type="datetime-local" value={form.fechaLimite} onChange={(event) => setForm((current) => ({ ...current, fechaLimite: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
                        </label>
                    </div>

                    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <input type="checkbox" checked={form.calificada} onChange={(event) => setForm((current) => ({ ...current, calificada: event.target.checked }))} />
                            Es calificable
                        </label>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <input type="checkbox" checked={form.visible} onChange={(event) => setForm((current) => ({ ...current, visible: event.target.checked }))} />
                            Visible para alumnos
                        </label>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            Nota maxima
                            <input type="number" min={0.1} step={0.1} disabled={!form.calificada} value={form.notaMaxima} onChange={(event) => setForm((current) => ({ ...current, notaMaxima: Number(event.target.value) }))} className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 disabled:opacity-50" />
                        </label>
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancelar</button>
                        <button type="submit" disabled={saving || options.length === 0} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50">
                            {saving && <Loader2 size={16} className="animate-spin" />}
                            Publicar actividad
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateActivityModal;
