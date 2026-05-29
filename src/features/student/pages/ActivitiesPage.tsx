import {
    Search,
    Filter,
    ListTodo,
} from "lucide-react";

import HeroCard from "../components/activities/HeroCard.tsx";
import ProgressCard from "../components/activities/ProgressCard.tsx";
import ActivityCard from "../components/activities/ActivityCard.tsx";
import CalendarCard from "../components/activities/CalendarCard.tsx";
import SupportCard from "../components/activities/SupportCard.tsx";

import { activities } from "../data/student/activitiesData.ts";

import StudentLayout from "../../../layout/StudentLayout.tsx";

function ActivitiesPage() {
    return (
        <StudentLayout>
            <div className="w-full">
                {/* HEADER */}
                <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900">
                            Actividades
                        </h1>
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
                    {/* HERO */}
                    <div className="lg:col-span-8">
                        <HeroCard />
                    </div>

                    {/* PROGRESS */}
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
        </StudentLayout>
    );
}

export default ActivitiesPage;