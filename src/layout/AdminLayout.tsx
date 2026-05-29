import Sidebar from "../components/shared/Sidebar";
import AdminHeader from "../components/shared/AdminHeader";
import Footer from "../components/shared/Footer";

import { adminMenu } from "../features/admin/navigation/adminMenu";

interface Props {
    children: React.ReactNode;
}

function AdminLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-100 flex">
            <Sidebar
                menu={adminMenu}
                title="EduTrack Pro"
            />

            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <AdminHeader />

                <div className="flex-1 p-6">
                    {children}
                </div>

                <Footer />
            </main>
        </div>
    );
}

export default AdminLayout;
