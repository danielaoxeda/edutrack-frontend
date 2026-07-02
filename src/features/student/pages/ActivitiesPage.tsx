import { Search, Filter, ListTodo } from 'lucide-react';

import SupportCard from '../components/activities/SupportCard';
import StudentLayout from '../layout/StudentLayout.tsx';
import {toActivityCardProps} from "../../../adapters/activityAdapter.ts";
import {useAuth} from "../../../context/AuthContext.tsx";
import {useActivities} from "../../../hooks/useActivities.ts";
import HeroCard from "../components/activities/HeroCard.tsx";
import ProgressCard from "../components/activities/ProgressCard.tsx";
import ActivityCard from "../components/activities/ActivityCard.tsx";
import CalendarCard from "../components/activities/CalendarCard.tsx";

export default function ActivitiesPage() {
    const { estudianteId } = useAuth();
    const { activities, sessions, loading, error } = useActivities(estudianteId || undefined);

    // Ordenar actividades por fecha límite (las más cercanas primero)
    const sortedActivities = [...activities].sort(
        (a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime()
    );

    // La primera actividad es la más próxima (Hero)
    const nextActivity = sortedActivities[0];

    // Convertir a props para ActivityCard
    const activityCardPropsList = sortedActivities.map(toActivityCardProps);

    if (error) {
        return (
            <StudentLayout>
                <div className="p-4 text-red-600">Error: {error}</div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>
            <div className="w-full">
                {/* HEADER */}
                <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900">Actividades</h1>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar actividades..."
                                className="pl-10 pr-4 py-3 rounded-full bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600 w-72"
                            />
                        </div>
                        <button className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                            <Filter size={20} />
                        </button>
                    </div>
                </header>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* HERO: muestra la actividad más próxima */}
                    <div className="lg:col-span-8">
                        {loading ? (
                            <div className="h-48 animate-pulse bg-slate-200 rounded-xl" />
                        ) : nextActivity ? (
                            <HeroCard activity={nextActivity} />
                        ) : (
                            <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                                No hay actividades próximas
                            </div>
                        )}
                    </div>

                    {/* PROGRESS */}
                    <div className="lg:col-span-4">
                        <ProgressCard activities={activities} />
                    </div>

                    {/* LISTA DE ACTIVIDADES */}
                    <div className="lg:col-span-12">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <ListTodo className="text-blue-700" />
                            Todas las actividades
                        </h2>

                        <div className="space-y-4">
                            {loading ? (
                                // Esqueletos de carga
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="h-24 animate-pulse bg-slate-200 rounded-xl" />
                                ))
                            ) : activityCardPropsList.length > 0 ? (
                                activityCardPropsList.map((props) => (
                                    <ActivityCard key={props.id} {...props} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-500">
                                    No tienes actividades pendientes.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CALENDAR (simplificado) */}
                    <div className="lg:col-span-5">
                        <CalendarCard sessions={sessions} />
                    </div>

                    {/* SUPPORT */}
                    <div className="lg:col-span-7">
                        <SupportCard />
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}