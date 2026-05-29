export const adminStats = [
    {
        id: 1,
        title: "Usuarios activos",
        value: "12,842",
        description: "Total último mes",
        color: "bg-blue-100 text-blue-700",
    },
    {
        id: 2,
        title: "Sesiones activas",
        value: "842",
        description: "Usuarios conectados",
        color: "bg-emerald-100 text-emerald-700",
    },
    {
        id: 3,
        title: "Tiempo de actividad",
        value: "99.98%",
        description: "Disponibilidad del sistema",
        color: "bg-purple-100 text-purple-700",
    },
    {
        id: 4,
        title: "Latencia promedio",
        value: "124 ms",
        description: "Respuesta del servidor",
        color: "bg-amber-100 text-amber-700",
    },
];

export const adminUsers = [
    {
        id: 1,
        name: "Sarah Anderson",
        email: "sarah.a@edutrack.edu",
        role: "Estudiante",
        status: "Activo",
        statusClass: "bg-emerald-100 text-emerald-700",
    },
    {
        id: 2,
        name: "James Miller",
        email: "j.miller@edutrack.edu",
        role: "Docente",
        status: "Activo",
        statusClass: "bg-emerald-100 text-emerald-700",
    },
    {
        id: 3,
        name: "Robert Lee",
        email: "r.lee@edutrack.edu",
        role: "Coordinador",
        status: "Offline",
        statusClass: "bg-slate-100 text-slate-600",
    },
    {
        id: 4,
        name: "Emily White",
        email: "emily.w@edutrack.edu",
        role: "Estudiante",
        status: "Suspendido",
        statusClass: "bg-red-100 text-red-700",
    },
];

export const adminLogs = [
    "Auth system initialized: Success",
    "Database pool expanded: +5 conexiones",
    "Usuario 8842 inició sesión (Sarah Anderson)",
    "Copia de seguridad programada: acad_data_v2",
    "Ratio de caché: 94.2%",
    "Salud del sistema: OPTIMAL",
    "Nuevo perfil de docente verificado: Miller, J.",
    "IP sospechosa bloqueada: 192.168.1.102",
];

export const adminSettings = [
    {
        title: "Termino académico",
        fields: [
            {
                label: "Periodo actual",
                value: "Fall 2024 - Semester 1",
            },
            {
                label: "Fecha de inicio",
                value: "2024-09-01",
            },
            {
                label: "Fecha de fin",
                value: "2024-12-22",
            },
        ],
    },
    {
        title: "Información de la institución",
        fields: [
            {
                label: "Nombre",
                value: "EduTrack Global Academy",
            },
            {
                label: "Zona horaria",
                value: "GMT-05:00 Eastern Time",
            },
        ],
    },
    {
        title: "Resumen de salud",
        summary: [
            "DB_SYNC: OK",
            "STORAGE: 65%",
            "AUTH_SVC: UP",
        ],
    },
];
