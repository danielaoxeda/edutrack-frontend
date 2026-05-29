import NotificationRow from "./NotificationRow";

function NotificationsCard() {
    return (
        <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="bg-slate-50 border-r border-slate-200 p-8">
                    <h2 className="text-2xl font-bold">
                        Notificaciones
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Elige cómo recibir alertas académicas.
                    </p>
                </div>

                <div className="md:col-span-2 p-8 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-slate-200 text-left text-sm text-slate-500 uppercase">
                            <th className="pb-4">
                                Tipo de alerta
                            </th>

                            <th className="pb-4 text-center">
                                Email
                            </th>

                            <th className="pb-4 text-center">
                                Push
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        <NotificationRow
                            title="Nuevas calificaciones"
                            description="Inmediato tras publicación."
                            email={true}
                            mobile={true}
                        />

                        <NotificationRow
                            title="Recordatorios de tareas"
                            description="24 horas antes."
                            email={true}
                            mobile={false}
                        />

                        <NotificationRow
                            title="Noticias institucionales"
                            description="Eventos y comunicados."
                            email={true}
                            mobile={true}
                        />
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default NotificationsCard;