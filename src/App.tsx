// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar.tsx";

// 👇 Importa tus páginas (ajusta las rutas según tu estructura)
import DashboardEstudiantePage from "./pages/StudentDashboard";
import ActivitiesPage from "./pages/ActivitiesPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen bg-slate-100">
                {/* Sidebar siempre visible */}
                <Sidebar />

                {/* Contenido principal */}
                <main className="flex-1 lg:ml-64 p-6">
                    <Routes>
                        <Route
                            path="/dashboard-estudiante"
                            element={<DashboardEstudiantePage />}
                        />
                        <Route
                            path="/actividades"
                            element={<ActivitiesPage />}
                        />

                        <Route path="*" element={<Navigate to="/dashboard-estudiante" replace />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;