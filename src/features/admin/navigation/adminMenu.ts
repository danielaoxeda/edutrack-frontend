import {
    BookOpen,
    LayoutDashboard,
    Settings,
    Users,
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
        label: "Cursos",
        icon: BookOpen,
        path: "/cursos-admin",
    },
    {
        label: "Configuracion",
        icon: Settings,
        path: "/configuracion-admin",
    },
];
