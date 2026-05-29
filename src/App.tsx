import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import DashboardEstudiantePage from "./features/student/pages/StudentDashboard";
import ActivitiesPage from "./features/student/pages/ActivitiesPage";
import SettingsPage from "./features/student/pages/SettingsPage.tsx";
import AdminDashboardPage from "./features/admin/pages/AdminDashboard";
import AuthPage from "./pages/AuthPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* AUTH */}
                <Route
                    path="/"
                    element={<AuthPage />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard-estudiante"
                    element={<DashboardEstudiantePage />}
                />
                <Route
                    path="/dashboard-admin"
                    element={<AdminDashboardPage />}
                />

                {/* ACTIVIDADES */}
                <Route
                    path="/actividades-estudiante"
                    element={<ActivitiesPage />}
                />
                <Route
                    path="/configuracion-estudiante"
                    element={<SettingsPage />}
                />


                {/* REDIRECT */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;