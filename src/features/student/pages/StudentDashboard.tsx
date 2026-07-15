import StatsCard from "../components/dashboard/StatsCards";
import AttendanceCard from "../components/dashboard/AttendanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import CourseCard from "../components/dashboard/CourseCards";
import AssignmentCard from "../components/dashboard/AssignmentCard";

import StudentLayout from "../layout/StudentLayout.tsx";
import { Link } from "react-router-dom";
import { useStudentDashboard } from "../../../hooks/useStudentDashboard";

function Dashboard() {

    const {
        summary,
        courses,
        assignments,
        loading,
        error
    } = useStudentDashboard();

    return (
        <StudentLayout>
            <div className="w-full">

                {/* TOP CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <StatsCard averageGrade={summary?.averageGrade} />
                    <AttendanceCard attendancePercent={summary?.attendancePercent} />
                    <QuickActions />
                </div>

                {/* ERROR */}
                {error && (
                    <div className="text-red-600 mb-4">
                        {error}
                    </div>
                )}

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COURSES */}
                    <div className="lg:col-span-2">

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">
                                Cursos activos
                            </h2>

                            <Link
                                to="/actividades-estudiante"
                                className="text-blue-700 font-medium hover:underline"
                            >
                                Ver todo
                            </Link>
                        </div>

                        <div className="space-y-4">

                            {loading
                                ? Array.from({ length: 3 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-24 bg-slate-200 rounded-2xl animate-pulse"
                                    />
                                ))
                                : courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        {...course}
                                    />
                                ))}

                        </div>
                    </div>

                    {/* ASSIGNMENTS */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">

                        <h2 className="text-xl font-bold mb-6">
                            Actividades semanales
                        </h2>

                        <div className="space-y-6">

                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-16 bg-slate-200 rounded-xl animate-pulse"
                                    />
                                ))
                                : assignments.map((assignment) => (
                                    <AssignmentCard
                                        key={assignment.id}
                                        {...assignment}
                                    />
                                ))}

                        </div>

                    </div>

                </div>

            </div>
        </StudentLayout>
    );
}

export default Dashboard;
