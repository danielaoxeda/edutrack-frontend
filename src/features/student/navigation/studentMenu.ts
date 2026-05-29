import {
    LayoutDashboard,
    FileText,
    GraduationCap,
    Calendar,
    Settings,
} from "lucide-react";

export const studentMenu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard-estudiante",
    },
    {
        label: "Actividades",
        icon: FileText,
        path: "/actividades-estudiante",
    },
    {
        label: "Certificaciones",
        icon: GraduationCap,
        path: "/certificaciones-estudiante",
    },
    {
        label: "Calendario",
        icon: Calendar,
        path: "/calendario-estudiante",
    },
    {
        label: "Configuración",
        icon: Settings,
        path: "/configuracion-estudiante",
    },
];