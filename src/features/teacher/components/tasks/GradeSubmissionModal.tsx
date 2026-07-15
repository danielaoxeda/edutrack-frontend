import {
    AlertTriangle,
    CheckCircle2,
    ExternalLink,
    FileText,
    Loader2,
    MessageSquareText,
    Star,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";

import type { RecentSubmissionItem } from "../../data/teacherDashboardData";

interface Props {
    submission: RecentSubmissionItem | null;
    saving: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (payload: { nota: number; comentario: string }) => Promise<void>;
}

export default function GradeSubmissionModal({
    submission,
    saving,
    error,
    onClose,
    onSubmit,
}: Props) {
    const [grade, setGrade] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        setGrade(submission?.grade != null ? String(submission.grade) : "");
        setComment(submission?.teacherComment ?? "");
    }, [submission]);

    if (!submission) {
        return null;
    }

    const maxGrade = submission.maxGrade ?? 5;
    const alreadyGraded = submission.grade != null || submission.status === "CALIFICADO";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
            <section className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                <header className="relative overflow-hidden border-b border-slate-100 bg-slate-950 px-6 py-6 text-white">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />
                    <div className="relative flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-200">
                                Revision de entrega
                            </p>
                            <h2 className="mt-2 text-2xl font-black">
                                {submission.taskName}
                            </h2>
                            <p className="mt-1 text-sm text-slate-300">
                                {submission.studentName} - {submission.courseName}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20"
                            aria-label="Cerrar modal"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </header>

                <form
                    className="space-y-5 px-6 py-6"
                    onSubmit={(event) => {
                        event.preventDefault();
                        void onSubmit({
                            nota: Number(grade),
                            comentario: comment,
                        });
                    }}
                >
                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
                                <FileText size={17} />
                                Estado
                            </div>
                            <p className="mt-2 text-sm font-semibold text-blue-700">
                                {alreadyGraded ? "Calificada" : "Pendiente de revision"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                                <Star size={17} />
                                Nota maxima
                            </div>
                            <p className="mt-2 text-sm font-semibold text-amber-700">
                                {maxGrade} puntos
                            </p>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                                <CheckCircle2 size={17} />
                                Entregado
                            </div>
                            <p className="mt-2 text-sm font-semibold text-emerald-700">
                                {submission.timeAgo}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                            <MessageSquareText size={16} />
                            Comentario del alumno
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">
                            {submission.studentComment || "El alumno no agrego comentario."}
                        </p>

                        {submission.fileUrl && (
                            <a
                                href={submission.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-50"
                            >
                                <ExternalLink size={15} />
                                Abrir archivo entregado
                            </a>
                        )}
                    </div>

                    {error && (
                        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                        <label className="block">
                            <span className="mb-2 block text-sm font-bold text-slate-700">
                                Nota
                            </span>
                            <input
                                type="number"
                                min="0"
                                max={maxGrade}
                                step="0.01"
                                value={grade}
                                onChange={(event) => setGrade(event.target.value)}
                                required
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-bold text-slate-700">
                                Retroalimentacion
                            </span>
                            <textarea
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                rows={3}
                                placeholder="Escribe una observacion breve para el alumno."
                                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </label>
                    </div>

                    <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
                        >
                            {saving ? <Loader2 size={17} className="animate-spin" /> : <CheckCircle2 size={17} />}
                            Guardar calificacion
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
}
