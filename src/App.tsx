import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import DashboardEstudiantePage from "./features/student/pages/StudentDashboard";
import ActivitiesPage from "./features/student/pages/ActivitiesPage";
import SettingsPage from "./features/student/pages/SettingsPage.tsx";
import TeacherDashboardPage from "./features/teacher/pages/TeacherDashboard";
import TeacherCoursesPage from "./features/teacher/pages/TeacherCourses";
import TeacherStudentsPage from "./features/teacher/pages/TeacherStudents";
import TeacherTasksPage from "./features/teacher/pages/TeacherTasks";
import TeacherGradesPage from "./features/teacher/pages/TeacherGrades";
import TeacherAttendancePage from "./features/teacher/pages/TeacherAttendance";
import TeacherMessagesPage from "./features/teacher/pages/TeacherMessages";
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

                {/* DASHBOARD ESTUDIANTE */}
                <Route
                    path="/dashboard-estudiante"
                    element={<DashboardEstudiantePage />}
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

                {/* DASHBOARD DOCENTE */}
                <Route
                    path="/dashboard-docente"
                    element={<TeacherDashboardPage />}
                />

                {/* CURSOS DOCENTE */}
                <Route
                    path="/cursos-docente"
                    element={<TeacherCoursesPage />}
                />

                {/* ESTUDIANTES DOCENTE */}
                <Route
                    path="/estudiantes-docente"
                    element={<TeacherStudentsPage />}
                />

                {/* TAREAS DOCENTE */}
                <Route
                    path="/tareas-docente"
                    element={<TeacherTasksPage />}
                />

                {/* CALIFICACIONES DOCENTE */}
                <Route
                    path="/calificaciones-docente"
                    element={<TeacherGradesPage />}
                />

                {/* ASISTENCIA DOCENTE */}
                <Route
                    path="/asistencia-docente"
                    element={<TeacherAttendancePage />}
                />

                {/* MENSAJES DOCENTE */}
                <Route
                    path="/mensajes-docente"
                    element={<TeacherMessagesPage />}
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