import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardEstudiantePage from "./features/student/pages/StudentDashboard";
import ActivitiesPage from "./features/student/pages/ActivitiesPage";
import SettingsPage from "./features/student/pages/SettingsPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/dashboard-estudiante"
                    element={<DashboardEstudiantePage />}
                />

                <Route
                    path="/actividades-estudiante"
                    element={<ActivitiesPage />}
                />
                <Route
                    path="/configuracion-estudiante"
                    element={<SettingsPage />}
                />


                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard-estudiante"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;