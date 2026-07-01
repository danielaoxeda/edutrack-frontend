import StatsCard from "../components/dashboard/StatsCards";
import AttendanceCard from "../components/dashboard/AttendanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import CourseCard from "../components/dashboard/CourseCards";
import AssignmentCard from "../components/dashboard/AssignmentCard";

import { courses, assignments } from "../data/student/studentDashboardData";
import StudentLayout from "../../../layout/StudentLayout.tsx";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <StudentLayout>
            <div className="w-full">
                {/* TOP CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <StatsCard />
                    <AttendanceCard />
                    <QuickActions />
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* COURSES */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">
                                Cursos activos
                            </h2>

                            <Link to="/actividades-estudiante" className="text-blue-700 font-medium hover:underline">
                                Ver todo
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {courses.map((course) => (
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
                            {assignments.map((assignment) => (
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