import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import DashboardEstudiantePage from "./pages/StudentDashboard";
import ActivitiesPage from "./pages/ActivitiesPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* HOME */}
                <Route
                    path="/"
                    element={<HomePage />}
                />

                {/* AUTH (moved) */}
                <Route
                    path="/auth"
                    element={<AuthPage />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard-estudiante"
                    element={<DashboardEstudiantePage />}
                />

                {/* ACTIVIDADES */}
                <Route
                    path="/actividades-estudiante"
                    element={<ActivitiesPage />}
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