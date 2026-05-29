import TeacherLayout from "../components/layout/TeacherLayout";
import StatsGrid from "../components/dashboard/StatsGrid";
import CourseGrid from "../components/dashboard/CourseGrid";
import PendingReviews from "../components/dashboard/PendingReviews";
import CourseAverageChart from "../components/dashboard/CourseAverageChart";
import AcademicAlerts from "../components/dashboard/AcademicAlerts";
import ClassSchedule from "../components/dashboard/ClassSchedule";

function TeacherDashboard() {
    return (
        <TeacherLayout>
            <div className="w-full space-y-6">
                
                {/* 1. TOP METRICS / STATISTICS */}
                <StatsGrid />

                {/* 2. GRID OF THE CONTENT (2 Columns on large, 1 on small) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT / CENTER REGIONS (2 Columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* active courses */}
                        <CourseGrid />

                        {/* sub-grid for homework review table and average grades chart */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* homeworks to grade */}
                            <PendingReviews />

                            {/* course grades average chart */}
                            <CourseAverageChart />

                        </div>

                    </div>

                    {/* RIGHT SIDEBAR REGIONS (1 Column) */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* academic alerts */}
                        <AcademicAlerts />

                        {/* timeline of class schedule */}
                        <ClassSchedule />

                    </div>

                </div>

            </div>
        </TeacherLayout>
    );
}

export default TeacherDashboard;
