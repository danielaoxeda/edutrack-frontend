export function resolveDashboard(role: string) {
    switch (role) {
        case "ADMIN":
            return "/dashboard-admin";
        case "TEACHER":
            return "/dashboard-docente";
        case "ESTUDIANTE":
        case "STUDENT":
            return "/dashboard-estudiante";
        default:
            return "/";
    }
}