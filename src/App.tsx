import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminCoursesPage from "./features/admin/pages/AdminCourses";
import AdminDashboardPage from "./features/admin/pages/AdminDashboard";
import AdminSettingsPage from "./features/admin/pages/AdminSettings";
import AdminUsersPage from "./features/admin/pages/AdminUsers";
import CoursesPage from "./features/student/pages/CoursesPage.tsx"
import HistoryPage from "./features/student/pages/HistoryPage.tsx";
import DashboardEstudiantePage from "./features/student/pages/StudentDashboard";
import SettingsPage from "./features/student/pages/SettingsPage";
import TeacherAttendancePage from "./features/teacher/pages/TeacherAttendance";
import TeacherCoursesPage from "./features/teacher/pages/TeacherCourses";
import TeacherDashboardPage from "./features/teacher/pages/TeacherDashboard";
import TeacherGradesPage from "./features/teacher/pages/TeacherGrades";
import TeacherMessagesPage from "./features/teacher/pages/TeacherMessages";
import TeacherStudentsPage from "./features/teacher/pages/TeacherStudents";
import TeacherTasksPage from "./features/teacher/pages/TeacherTasks";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />

                <Route
                    path="/dashboard-estudiante"
                    element={
                        <ProtectedRoute allow={["STUDENT", "TEACHER", "ADMIN"]}>
                            <DashboardEstudiantePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cursos-estudiante"
                    element={
                        <ProtectedRoute allow={["STUDENT", "TEACHER", "ADMIN"]}>
                            <CoursesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/historial-estudiante"
                    element={
                        <ProtectedRoute allow={["STUDENT", "TEACHER", "ADMIN"]}>
                            <HistoryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/configuracion-estudiante"
                    element={
                        <ProtectedRoute allow={["STUDENT", "TEACHER", "ADMIN"]}>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard-admin"
                    element={
                        <ProtectedRoute allow={["ADMIN"]}>
                            <AdminDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/usuarios-admin"
                    element={
                        <ProtectedRoute allow={["ADMIN"]}>
                            <AdminUsersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cursos-admin"
                    element={
                        <ProtectedRoute allow={["ADMIN"]}>
                            <AdminCoursesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/configuracion-admin"
                    element={
                        <ProtectedRoute allow={["ADMIN"]}>
                            <AdminSettingsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard-docente"
                    element={
                        <ProtectedRoute allow={["TEACHER", "ADMIN"]}>
                            <TeacherDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cursos-docente"
                    element={
                        <ProtectedRoute allow={["TEACHER", "ADMIN"]}>
                            <TeacherCoursesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/estudiantes-docente"
                    element={
                        <ProtectedRoute allow={["TEACHER", "ADMIN"]}>
                            <TeacherStudentsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tareas-docente"
                    element={
                        <ProtectedRoute allow={["TEACHER", "ADMIN"]}>
                            <TeacherTasksPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/calificaciones-docente"
                    element={
                        <ProtectedRoute allow={["TEACHER", "ADMIN"]}>
                            <TeacherGradesPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/asistencia-docente"
                    element={
                        <ProtectedRoute allow={["TEACHER", "ADMIN"]}>
                            <TeacherAttendancePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mensajes-docente"
                    element={
                        <ProtectedRoute allow={["TEACHER", "ADMIN"]}>
                            <TeacherMessagesPage />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
