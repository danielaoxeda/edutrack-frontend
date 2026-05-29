import {
    LayoutDashboard,
    BookOpen,
    Users,
    FileText,
    GraduationCap,
    CheckSquare,
    Mail,
    Settings,
} from "lucide-react";

export const teacherMenu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard-docente",
    },
    {
        label: "Mis cursos",
        icon: BookOpen,
        path: "/cursos-docente",
    },
    {
        label: "Estudiantes",
        icon: Users,
        path: "/estudiantes-docente",
    },
    {
        label: "Tareas",
        icon: FileText,
        path: "/tareas-docente",
    },
    {
        label: "Calificaciones",
        icon: GraduationCap,
        path: "/calificaciones-docente",
    },
    {
        label: "Asistencia",
        icon: CheckSquare,
        path: "/asistencia-docente",
    },
    {
        label: "Mensajes",
        icon: Mail,
        path: "/mensajes-docente",
    },
    {
        label: "Settings",
        icon: Settings,
        path: "/configuracion-docente",
    },
];
