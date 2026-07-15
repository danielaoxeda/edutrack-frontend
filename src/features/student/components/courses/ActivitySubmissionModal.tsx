import { useEffect, useState } from "react";
import {
    AlertTriangle,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Link,
    Loader2,
    MessageSquareText,
    UploadCloud,
    X,
} from "lucide-react";

import type { StudentWorkspaceActivity } from "../../api/studentWorkspaceApi";

interface Props {
    activity: StudentWorkspaceActivity | null;
    isSubmitting: boolean;
    error: string | null;
    onClose: () => void;
    onSubmit: (payload: { comentarioAlumno: string; archivoUrl: string }) => Promise<void>;
}

export default function ActivitySubmissionModal({
    activity,
    isSubmitting,
    error,
    onClose,
    onSubmit,
}: Props) {
    const [comment, setComment] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        setComment(activity?.delivery?.studentComment ?? "");
        setFileUrl(activity?.delivery?.fileUrl ?? "");
    }, [activity]);

    if (!activity) {
        return null;
    }

    const isGraded = activity.status === "CALIFICADA" || activity.status === "CALIFICADO" || activity.delivery?.grade != null;
    const hasDelivery = activity.delivery != null;
    const dueDate = new Date(activity.dueDate);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
            <section className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                <header className="border-b border-slate-100 bg-slate-50 px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                                {activity.courseCode} - {activity.sectionName}
                            </p>
                            <h2 className="mt-2 text-2xl font-black text-slate-950">
                                {activity.title}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {activity.courseName}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
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
                            comentarioAlumno: comment,
                            archivoUrl: fileUrl,
                        });
                    }}
                >
                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <CalendarDays size={17} className="text-blue-600" />
                                Fecha limite
                            </div>
                            <p className="mt-2 text-sm text-slate-500">
                                {dueDate.toLocaleDateString("es-PE", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                {hasDelivery ? <CheckCircle2 size={17} className="text-emerald-600" /> : <Clock3 size={17} className="text-amber-600" />}
                                Estado
                            </div>
                            <p className="mt-2 text-sm text-slate-500">
                                {isGraded ? "Calificada" : hasDelivery ? "Entrega enviada" : "Pendiente de envio"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <UploadCloud size={17} className="text-blue-600" />
                                Nota maxima
                            </div>
                            <p className="mt-2 text-sm text-slate-500">
                                {activity.maxGrade} puntos
                            </p>
                        </div>
                    </div>

                    {activity.description && (
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-relaxed text-blue-950">
                            {activity.description}
                        </div>
                    )}

                    {isGraded && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                            Esta entrega ya fue calificada. Puedes revisar la retroalimentacion, pero no modificar el envio.
                        </div>
                    )}

                    {error && (
                        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                            <MessageSquareText size={17} className="text-blue-600" />
                            Comentario para el docente
                        </span>
                        <textarea
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            disabled={isGraded}
                            rows={5}
                            placeholder="Describe brevemente tu entrega, avances o indicaciones para revisar."
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                            <Link size={17} className="text-blue-600" />
                            Enlace del archivo
                        </span>
                        <input
                            value={fileUrl}
                            onChange={(event) => setFileUrl(event.target.value)}
                            disabled={isGraded}
                            placeholder="https://drive.google.com/..."
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        />
                    </label>

                    {activity.delivery?.teacherComment && (
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                Comentario del docente
                            </p>
                            <p className="mt-2 text-sm text-slate-700">
                                {activity.delivery.teacherComment}
                            </p>
                        </div>
                    )}

                    <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cerrar
                        </button>

                        {!isGraded && (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
                            >
                                {isSubmitting ? <Loader2 size={17} className="animate-spin" /> : <UploadCloud size={17} />}
                                {hasDelivery ? "Actualizar entrega" : "Enviar entrega"}
                            </button>
                        )}
                    </footer>
                </form>
            </section>
        </div>
    );
}
