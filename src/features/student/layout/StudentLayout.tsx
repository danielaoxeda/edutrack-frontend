import Footer from "../../../components/shared/Footer.tsx";

import { studentMenu } from "../navigation/studentMenu.ts";
import StudentHeader from "./StudentHeader.tsx";
import StudentSidebar from "./StudentSidebar.tsx";

interface Props {
    children: React.ReactNode;
}

function StudentLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <StudentSidebar
                menu={studentMenu}
                title="EduTrack"
            />

            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <StudentHeader />

                <div className="flex-1 p-6">
                    {children}
                </div>

                <Footer />
            </main>
        </div>
    );
}

export default StudentLayout;