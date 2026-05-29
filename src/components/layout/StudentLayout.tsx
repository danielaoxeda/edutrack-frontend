import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface Props {
    children: React.ReactNode;
}

function StudentLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />

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