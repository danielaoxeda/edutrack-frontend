import TeacherSidebar from "./TeacherSidebar";
import TeacherHeader from "./TeacherHeader";
import Footer from "../../../../components/shared/Footer";

interface Props {
    children: React.ReactNode;
}

function TeacherLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Custom Sidebar for Teacher */}
            <TeacherSidebar />

            {/* Main content area */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden">
                {/* Custom Header for Teacher */}
                <TeacherHeader />

                {/* Dashboard content */}
                <div className="flex-1 p-6 lg:p-8">
                    {children}
                </div>

                {/* Shared Footer */}
                <Footer />
            </main>
        </div>
    );
}

export default TeacherLayout;
