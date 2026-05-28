import {
    Search,
    Filter,
    ListTodo,
} from "lucide-react";

import HeroCard from "../components/activities/HeroCard";
import ProgressCard from "../components/activities/ProgressCard";
import ActivityCard from "../components/activities/ActivityCard";
import CalendarCard from "../components/activities/CalendarCard";
import SupportCard from "../components/activities/SupportCard";

import { activities } from "../data/activitiesData";

function ActivitiesPage() {
    return (
        <div className="min-h-screen bg-slate-100 p-6 lg:p-8">
            {/* HEADER */}
            <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900">
                        Actividades
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Gestión de entregas para Ingeniería de
                        Software
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-3 text-slate-400"
                            size={20}
                        />

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
                <div className="lg:col-span-8">
                    <HeroCard />
                </div>

                <div className="lg:col-span-4">
                    <ProgressCard />
                </div>

                {/* ACTIVITIES */}
                <div className="lg:col-span-12">
                    <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                        <ListTodo className="text-blue-700" />

                        Todas las actividades
                    </h2>

                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                {...activity}
                            />
                        ))}
                    </div>
                </div>

                {/* CALENDAR */}
                <div className="lg:col-span-5">
                    <CalendarCard />
                </div>

                {/* SUPPORT */}
                <div className="lg:col-span-7">
                    <SupportCard />
                </div>
            </div>
        </div>
    );
}

export default ActivitiesPage;