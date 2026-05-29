import Sidebar from "../components/shared/Sidebar";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

import { studentMenu } from "../features/student/navigation/studentMenu.ts";

interface Props {
    children: React.ReactNode;
}

function StudentLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar
                menu={studentMenu}
                title="EduTrack"
            />

            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <Header />

                <div className="flex-1 p-6">
                    {children}
                </div>

                <Footer />
            </main>
        </div>
    );
}

export default StudentLayout;