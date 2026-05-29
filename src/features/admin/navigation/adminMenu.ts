import {
    LayoutDashboard,
    Users,
    FileText,
    Activity,
    Settings,
} from "lucide-react";

export const adminMenu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard-admin",
    },
    {
        label: "Usuarios",
        icon: Users,
        path: "/usuarios-admin",
    },
    {
        label: "Reportes",
        icon: FileText,
        path: "/reportes-admin",
    },
    {
        label: "Asistencia",
        icon: Activity,
        path: "/asistencia-admin",
    },
    {
        label: "Configuración",
        icon: Settings,
        path: "/configuracion-admin",
    },
];
