import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardEstudiantePage from "./pages/StudentDashboard";
import ActivitiesPage from "./pages/ActivitiesPage";

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