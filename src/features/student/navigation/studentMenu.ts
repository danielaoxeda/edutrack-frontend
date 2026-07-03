import {
    LayoutDashboard,
    FileText,
    GraduationCap,
    Settings,
} from "lucide-react";

export const studentMenu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard-estudiante",
    },
    {
        label: "Cursos",
        icon: FileText,
        path: "/cursos-estudiante",
    },
    {
        label: "Historial académico",
        icon: GraduationCap,
        path: "/historial-estudiante",
    },

    {
        label: "Configuración",
        icon: Settings,
        path: "/configuracion-estudiante",
    },
];