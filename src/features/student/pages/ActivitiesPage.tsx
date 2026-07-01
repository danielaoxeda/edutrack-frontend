// src/pages/student/ActivitiesPage.tsx
import { Search, Filter, ListTodo } from 'lucide-react';
import HeroCard from '../components/activities/HeroCard';
import ProgressCard from '../components/activities/ProgressCard';
import ActivityCard from '../components/activities/ActivityCard';
import CalendarCard from '../components/activities/CalendarCard';
import SupportCard from '../components/activities/SupportCard';
import StudentLayout from '../../../layout/StudentLayout';
import {useActivities} from "../../../hooks/useActivities.ts";

function ActivitiesPage() {
    // Por ahora sin filtros, pero podemos añadirlos después
    const { activities, loading, error } = useActivities();

    // Calcular la actividad más próxima (para HeroCard)
    const now = new Date();
    const upcomingActivities = activities
        .filter(a => new Date(a.fechaLimite) >= now && a.estado === 'Pendiente')
        .sort((a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime());

    const nextActivity = upcomingActivities.length > 0 ? upcomingActivities[0] : null;

    // Podríamos también calcular estadísticas para ProgressCard
    const totalActivities = activities.length;
    const completedActivities = activities.filter(a => a.estado === 'Entregado' || a.estado === 'Calificado').length;

    if (loading) {
        return (
            <StudentLayout>
                <div className="w-full flex justify-center items-center min-h-[400px]">
                    <p className="text-slate-500">Cargando actividades...</p>
                </div>
            </StudentLayout>
        );
    }

    if (error) {
        return (
            <StudentLayout>
                <div className="w-full flex justify-center items-center min-h-[400px]">
                    <p className="text-red-500">{error}</p>
                </div>
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
                    {/* HERO */}
                    <div className="lg:col-span-8">
                        <HeroCard nextActivity={nextActivity} />
                    </div>

                    {/* PROGRESS */}
                    <div className="lg:col-span-4">
                        <ProgressCard total={totalActivities} completed={completedActivities} />
                    </div>

                    {/* ACTIVITIES */}
                    <div className="lg:col-span-12">
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <ListTodo className="text-blue-700" />
                            Todas las actividades
                        </h2>

                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <ActivityCard key={activity.id} {...activity} />
                            ))}
                        </div>
                    </div>

                    {/* CALENDAR */}
                    <div className="lg:col-span-5">
                        <CalendarCard activities={activities} />
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

export default ActivitiesPage;