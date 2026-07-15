export interface StatItem {
    label: string;
    value: string | number;
    subtext?: string;
    iconName: string;
}

export interface CourseItem {
    id: string;
    title: string;
    code: string;
    group: string;
    studentsCount: number;
    averageGrade: string;
    progress: number;
    nextClass: string;
    status: "activo" | "progreso";
}

export interface PendingReviewItem {
    id: string;
    studentName: string;
    courseName: string;
    taskName: string;
    time: string;
}

export interface AcademicAlertItem {
    id: string;
    type: "risk" | "overdue";
    title: string;
    description: string;
    actionLabel: string;
}

export interface ClassScheduleItem {
    id: string;
    time: string;
    title: string;
    location: string;
    type: string;
}

export interface CourseAverageItem {
    course: string;
    average: number;
}

export interface StudentItem {
    id: string;
    name: string;
    email: string;
    code: string;
    course: string;
    group: string;
    averageGrade: number | null;
    attendance: number | null;
    status: "sobresaliente" | "regular" | "riesgo" | "sin_evaluacion";
}

export interface StudentAlertItem {
    id: string;
    studentName: string;
    timeText: string;
    description: string;
    metaLabel: string;
    metaValue: string;
    type: "attendance" | "grade" | "homework";
}

export interface TaskItem {
    id: string;
    name: string;
    course: string;
    group: string;
    publishedDate: string;
    limitDate: string;
    receivedCount: number;
    totalCount: number;
    status: "activo" | "vencido" | "calificando" | "evaluado";
}

export interface RecentSubmissionItem {
    id: string;
    deliveryId?: number;
    studentName: string;
    taskName: string;
    courseName: string;
    timeAgo: string;
    status?: string;
    maxGrade?: number;
    grade?: number | null;
    studentComment?: string | null;
    teacherComment?: string | null;
    fileUrl?: string | null;
}

export interface UrgentTaskItem {
    id: string;
    title: string;
    courseName: string;
    dueText: string;
    receivedCount: number;
    totalCount: number;
    percentage: number;
}

export interface GradeBookItem {
    id: string;
    name: string;
    code: string;
    course: string;
    group: string;
    pc1: number;
    pc2: number;
    parcial: number;
    final: number;
    average: number;
    status: "aprobado" | "reprobado" | "pendiente";
}

export const statsData: StatItem[] = [
    {
        label: "Cursos Activos",
        value: 6,
        iconName: "BookOpen",
    },
    {
        label: "Estudiantes Totales",
        value: 150,
        iconName: "Users",
    },
    {
        label: "Tareas Pendientes",
        value: 24,
        iconName: "FileText",
    },
    {
        label: "Eval. por Revisar",
        value: 12,
        iconName: "GraduationCap",
    },
    {
        label: "Promedio General",
        value: "4.2",
        subtext: "/ 5.0",
        iconName: "TrendingUp",
    },
];

export const coursesData: CourseItem[] = [
    {
        id: "c1",
        title: "Ingeniería de Software",
        code: "ISW-401",
        group: "Grupo A",
        studentsCount: 35,
        averageGrade: "4.2",
        progress: 65,
        nextClass: "Hoy, 14:00 - Lab 302",
        status: "activo",
    },
    {
        id: "c2",
        title: "Base de Datos II",
        code: "BBD-302",
        group: "Grupo C",
        studentsCount: 28,
        averageGrade: "3.8",
        progress: 40,
        nextClass: "Mañana, 08:00 - Virtual",
        status: "activo",
    },
    {
        id: "c3",
        title: "Sistemas Operativos",
        code: "SOP-205",
        group: "Grupo B",
        studentsCount: 32,
        averageGrade: "4.3",
        progress: 80,
        nextClass: "Jueves, 10:00 - Lab 301",
        status: "activo",
    },
    {
        id: "c4",
        title: "Inteligencia Artificial",
        code: "INT-501",
        group: "Grupo A",
        studentsCount: 24,
        averageGrade: "4.6",
        progress: 25,
        nextClass: "Viernes, 14:00 - Lab 303",
        status: "progreso",
    },
    {
        id: "c5",
        title: "Redes de Computadoras",
        code: "RED-305",
        group: "Grupo B",
        studentsCount: 30,
        averageGrade: "4.1",
        progress: 55,
        nextClass: "Lunes, 08:00 - Aula 204",
        status: "activo",
    },
    {
        id: "c6",
        title: "Programación Web",
        code: "WEB-402",
        group: "Grupo A",
        studentsCount: 40,
        averageGrade: "4.5",
        progress: 70,
        nextClass: "Miércoles, 16:00 - Lab 302",
        status: "activo",
    },
];

export const pendingReviewsData: PendingReviewItem[] = [
    {
        id: "r1",
        studentName: "Ana García",
        courseName: "Ing. Software",
        taskName: "Taller de Requerimientos",
        time: "Hoy, 10:30",
    },
    {
        id: "r2",
        studentName: "Carlos Ruiz",
        courseName: "Base de Datos II",
        taskName: "Modelo Relacional",
        time: "Hoy, 09:15",
    },
    {
        id: "r3",
        studentName: "Lucía Méndez",
        courseName: "Sist. Operativos",
        taskName: "Administración de Procesos",
        time: "Hoy, 08:30",
    },
    {
        id: "r4",
        studentName: "Miguel Torres",
        courseName: "Ing. Software",
        taskName: "Diagrama de Clases",
        time: "Ayer, 18:00",
    },
];

export const alertsData: AcademicAlertItem[] = [
    {
        id: "a1",
        type: "risk",
        title: "Estudiantes en Riesgo (3)",
        description: "Bajo rendimiento consecutivo en Base de Datos II.",
        actionLabel: "Ver detalles",
    },
    {
        id: "a2",
        type: "overdue",
        title: "Tareas Vencidas (8)",
        description: "Entregas no recibidas para Taller 2 de SO.",
        actionLabel: "Enviar recordatorio",
    },
];

export const scheduleData: ClassScheduleItem[] = [
    {
        id: "s1",
        time: "14:00 - 15:30",
        title: "Ing. Software",
        location: "Lab 302 - Práctica",
        type: "Práctica",
    },
    {
        id: "s2",
        time: "16:30 - 18:00",
        title: "Sist. Operativos",
        location: "Auditorio B - Evaluación",
        type: "Evaluación",
    },
];

export const courseAveragesData: CourseAverageItem[] = [
    { course: "Ing. Software", average: 4.5 },
    { course: "Base de Datos II", average: 3.8 },
    { course: "Sist. Operativos", average: 4.3 },
    { course: "Redes I", average: 4.1 },
    { course: "Prog. Web", average: 4.6 },
];

export const studentsData: StudentItem[] = [
    {
        id: "s1",
        name: "Valeria Castillo",
        email: "vcastillo@edutrack.edu",
        code: "2023-0145",
        course: "Ingeniería de Software",
        group: "Grupo A",
        averageGrade: 4.6,
        attendance: 98,
        status: "sobresaliente",
    },
    {
        id: "s2",
        name: "Mateo Rojas",
        email: "mrojas@edutrack.edu",
        code: "2023-0211",
        course: "Sistemas Operativos",
        group: "Grupo B",
        averageGrade: 3.5,
        attendance: 85,
        status: "regular",
    },
    {
        id: "s3",
        name: "Carlos Mendoza",
        email: "cmendoza@edutrack.edu",
        code: "2023-0089",
        course: "Ingeniería de Software",
        group: "Grupo A",
        averageGrade: 2.4,
        attendance: 65,
        status: "riesgo",
    },
    {
        id: "s4",
        name: "Ana Rojas",
        email: "arojas@edutrack.edu",
        code: "2023-0301",
        course: "Sistemas Operativos",
        group: "Grupo B",
        averageGrade: 2.0,
        attendance: 70,
        status: "riesgo",
    },
    {
        id: "s5",
        name: "Luis Peña",
        email: "lpena@edutrack.edu",
        code: "2023-0412",
        course: "Base de Datos II",
        group: "Grupo C",
        averageGrade: 3.8,
        attendance: 90,
        status: "regular",
    },
    {
        id: "s6",
        name: "Lucía Méndez",
        email: "lmendez@edutrack.edu",
        code: "2023-0182",
        course: "Base de Datos II",
        group: "Grupo C",
        averageGrade: 4.8,
        attendance: 99,
        status: "sobresaliente",
    },
    {
        id: "s7",
        name: "Sofía Castro",
        email: "scastro@edutrack.edu",
        code: "2023-0523",
        course: "Ingeniería de Software",
        group: "Grupo A",
        averageGrade: 4.3,
        attendance: 94,
        status: "sobresaliente",
    },
    {
        id: "s8",
        name: "Diego Torres",
        email: "dtorres@edutrack.edu",
        code: "2023-0091",
        course: "Sistemas Operativos",
        group: "Grupo B",
        averageGrade: 2.9,
        attendance: 68,
        status: "riesgo",
    },
    {
        id: "s9",
        name: "Gabriel Ruiz",
        email: "gruiz@edutrack.edu",
        code: "2023-0341",
        course: "Inteligencia Artificial",
        group: "Grupo A",
        averageGrade: 4.7,
        attendance: 96,
        status: "sobresaliente",
    },
    {
        id: "s10",
        name: "Valentina Gómez",
        email: "vgomez@edutrack.edu",
        code: "2023-0112",
        course: "Inteligencia Artificial",
        group: "Grupo A",
        averageGrade: 3.9,
        attendance: 92,
        status: "regular",
    },
];

export const studentAlertsData: StudentAlertItem[] = [
    {
        id: "sa1",
        studentName: "Carlos Mendoza",
        timeText: "Hace 2h",
        description: "Ausencia consecutiva por 3ra vez en Ingeniería de Software.",
        metaLabel: "Asistencia",
        metaValue: "65%",
        type: "attendance",
    },
    {
        id: "sa2",
        studentName: "Ana Rojas",
        timeText: "Ayer",
        description: "Calificación crítica en Parcial 1 (Sistemas Operativos).",
        metaLabel: "Nota",
        metaValue: "2.0 / 5.0",
        type: "grade",
    },
    {
        id: "sa3",
        studentName: "Luis Peña",
        timeText: "Ayer",
        description: "No entregó las últimas 2 tareas asignadas en Base de Datos II.",
        metaLabel: "Pendientes",
        metaValue: "2 tareas",
        type: "homework",
    },
];

export const tasksData: TaskItem[] = [
    {
        id: "t1",
        name: "Ensayo Final: Historia Moderna",
        course: "Ingeniería de Software",
        group: "Grupo A",
        publishedDate: "10/10",
        limitDate: "25/10",
        receivedCount: 28,
        totalCount: 30,
        status: "activo",
    },
    {
        id: "t2",
        name: "Proyecto de Ciencias: Modelo Físico",
        course: "Base de Datos II",
        group: "Grupo C",
        publishedDate: "05/10",
        limitDate: "15/10",
        receivedCount: 30,
        totalCount: 30,
        status: "calificando",
    },
    {
        id: "t3",
        name: "Taller 3: Gestión de Memoria",
        course: "Sistemas Operativos",
        group: "Grupo B",
        publishedDate: "12/10",
        limitDate: "28/10",
        receivedCount: 15,
        totalCount: 32,
        status: "activo",
    },
    {
        id: "t4",
        name: "Proyecto Final: Red Neuronal",
        course: "Inteligencia Artificial",
        group: "Grupo A",
        publishedDate: "20/10",
        limitDate: "10/11",
        receivedCount: 5,
        totalCount: 24,
        status: "activo",
    },
    {
        id: "t5",
        name: "Práctica Evaluada 2: SQL Avanzado",
        course: "Base de Datos II",
        group: "Grupo C",
        publishedDate: "01/10",
        limitDate: "10/10",
        receivedCount: 28,
        totalCount: 28,
        status: "evaluado",
    },
];

export const recentSubmissionsData: RecentSubmissionItem[] = [
    {
        id: "sub1",
        studentName: "Juan Pérez",
        taskName: "Ensayo Final: Historia",
        courseName: "Ing. Software",
        timeAgo: "Hace 5 min",
    },
    {
        id: "sub2",
        studentName: "María Gómez",
        taskName: "Taller 3: Memoria",
        courseName: "Sist. Operativos",
        timeAgo: "Hace 15 min",
    },
    {
        id: "sub3",
        studentName: "Lucas Torres",
        taskName: "Proyecto de Ciencias",
        courseName: "Base de Datos II",
        timeAgo: "Hace 1h",
    },
];

export const urgentTasksData: UrgentTaskItem[] = [
    {
        id: "u1",
        title: "Reporte Práctica 3",
        courseName: "Ingeniería de Software",
        dueText: "Vence hoy",
        receivedCount: 25,
        totalCount: 30,
        percentage: 85,
    },
    {
        id: "u2",
        title: "Análisis Literario",
        courseName: "Sistemas Operativos",
        dueText: "Mañana",
        receivedCount: 12,
        totalCount: 30,
        percentage: 40,
    },
];

export const gradeBookData: GradeBookItem[] = [
    {
        id: "g1",
        name: "Valeria Castillo",
        code: "2023-0145",
        course: "Ingeniería de Software",
        group: "Grupo A",
        pc1: 4.8,
        pc2: 4.5,
        parcial: 4.3,
        final: 4.8,
        average: 4.6,
        status: "aprobado",
    },
    {
        id: "g2",
        name: "Mateo Rojas",
        code: "2023-0211",
        course: "Sistemas Operativos",
        group: "Grupo B",
        pc1: 3.5,
        pc2: 3.2,
        parcial: 3.0,
        final: 3.8,
        average: 3.5,
        status: "aprobado",
    },
    {
        id: "g3",
        name: "Carlos Mendoza",
        code: "2023-0089",
        course: "Ingeniería de Software",
        group: "Grupo A",
        pc1: 2.5,
        pc2: 2.8,
        parcial: 2.0,
        final: 2.3,
        average: 2.4,
        status: "reprobado",
    },
    {
        id: "g4",
        name: "Ana Rojas",
        code: "2023-0301",
        course: "Sistemas Operativos",
        group: "Grupo B",
        pc1: 2.0,
        pc2: 1.8,
        parcial: 2.2,
        final: 2.0,
        average: 2.0,
        status: "reprobado",
    },
    {
        id: "g5",
        name: "Luis Peña",
        code: "2023-0412",
        course: "Base de Datos II",
        group: "Grupo C",
        pc1: 4.0,
        pc2: 3.8,
        parcial: 3.5,
        final: 4.0,
        average: 3.8,
        status: "aprobado",
    },
    {
        id: "g6",
        name: "Lucía Méndez",
        code: "2023-0182",
        course: "Base de Datos II",
        group: "Grupo C",
        pc1: 4.8,
        pc2: 4.9,
        parcial: 4.5,
        final: 4.9,
        average: 4.8,
        status: "aprobado",
    },
    {
        id: "g7",
        name: "Sofía Castro",
        code: "2023-0523",
        course: "Ingeniería de Software",
        group: "Grupo A",
        pc1: 4.5,
        pc2: 4.0,
        parcial: 4.2,
        final: 4.5,
        average: 4.3,
        status: "aprobado",
    },
    {
        id: "g8",
        name: "Diego Torres",
        code: "2023-0091",
        course: "Sistemas Operativos",
        group: "Grupo B",
        pc1: 3.0,
        pc2: 2.8,
        parcial: 2.5,
        final: 3.1,
        average: 2.9,
        status: "reprobado",
    },
    {
        id: "g9",
        name: "Gabriel Ruiz",
        code: "2023-0341",
        course: "Inteligencia Artificial",
        group: "Grupo A",
        pc1: 4.6,
        pc2: 4.8,
        parcial: 4.5,
        final: 4.8,
        average: 4.7,
        status: "aprobado",
    },
    {
        id: "g10",
        name: "Valentina Gómez",
        code: "2023-0112",
        course: "Inteligencia Artificial",
        group: "Grupo A",
        pc1: 3.8,
        pc2: 4.0,
        parcial: 3.5,
        final: 4.1,
        average: 3.9,
        status: "aprobado",
    },
];

export interface AttendanceRegistryItem {
    id: string;
    name: string;
    email: string;
    code: string;
    course: string;
    group: string;
    attendance: number | null;
    todayStatus: "presente" | "tardanza" | "falta" | "sin_registro";
}

export const attendanceRegistryData: AttendanceRegistryItem[] = [
    {
        id: "a1",
        name: "Valeria Castillo",
        email: "vcastillo@edutrack.edu",
        code: "2023-0145",
        course: "Ingeniería de Software",
        group: "Grupo A",
        attendance: 98,
        todayStatus: "presente",
    },
    {
        id: "a2",
        name: "Mateo Rojas",
        email: "mrojas@edutrack.edu",
        code: "2023-0211",
        course: "Sistemas Operativos",
        group: "Grupo B",
        attendance: 85,
        todayStatus: "tardanza",
    },
    {
        id: "a3",
        name: "Carlos Mendoza",
        email: "cmendoza@edutrack.edu",
        code: "2023-0089",
        course: "Ingeniería de Software",
        group: "Grupo A",
        attendance: 65,
        todayStatus: "falta",
    },
    {
        id: "a4",
        name: "Ana Rojas",
        email: "arojas@edutrack.edu",
        code: "2023-0301",
        course: "Sistemas Operativos",
        group: "Grupo B",
        attendance: 70,
        todayStatus: "falta",
    },
    {
        id: "a5",
        name: "Luis Peña",
        email: "lpena@edutrack.edu",
        code: "2023-0412",
        course: "Base de Datos II",
        group: "Grupo C",
        attendance: 90,
        todayStatus: "presente",
    },
    {
        id: "a6",
        name: "Lucía Méndez",
        email: "lmendez@edutrack.edu",
        code: "2023-0182",
        course: "Base de Datos II",
        group: "Grupo C",
        attendance: 99,
        todayStatus: "presente",
    },
    {
        id: "a7",
        name: "Sofía Castro",
        email: "scastro@edutrack.edu",
        code: "2023-0523",
        course: "Ingeniería de Software",
        group: "Grupo A",
        attendance: 94,
        todayStatus: "presente",
    },
    {
        id: "a8",
        name: "Diego Torres",
        email: "dtorres@edutrack.edu",
        code: "2023-0091",
        course: "Sistemas Operativos",
        group: "Grupo B",
        attendance: 68,
        todayStatus: "tardanza",
    },
    {
        id: "a9",
        name: "Gabriel Ruiz",
        email: "gruiz@edutrack.edu",
        code: "2023-0341",
        course: "Inteligencia Artificial",
        group: "Grupo A",
        attendance: 96,
        todayStatus: "presente",
    },
    {
        id: "a10",
        name: "Valentina Gómez",
        email: "vgomez@edutrack.edu",
        code: "2023-0112",
        course: "Inteligencia Artificial",
        group: "Grupo A",
        attendance: 92,
        todayStatus: "presente",
    },
];

export interface ChatContact {
    id: string;
    name: string;
    avatar?: string;
    role: string;
    type: "estudiante" | "padre" | "colega";
    online: boolean;
}

export interface MessageItem {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    sentByMe: boolean;
}

export interface ChatRoom {
    id: string;
    contact: ChatContact;
    unreadCount: number;
    messages: MessageItem[];
}

export const chatRoomsMockData: ChatRoom[] = [
    {
        id: "chat1",
        contact: {
            id: "c_valeria",
            name: "Valeria Castillo",
            role: "Estudiante • Ingeniería de Software",
            type: "estudiante",
            online: true,
        },
        unreadCount: 0,
        messages: [
            {
                id: "m1_1",
                senderId: "c_valeria",
                text: "Profesor, buenas tardes. Quería hacerle una consulta sobre el trabajo final de diagramas.",
                timestamp: "14:20",
                sentByMe: false,
            },
            {
                id: "m1_2",
                senderId: "docente",
                text: "Hola Valeria, buenas tardes. Claro, dime cuál es tu duda.",
                timestamp: "14:22",
                sentByMe: true,
            },
            {
                id: "m1_3",
                senderId: "c_valeria",
                text: "¿Podemos usar la herramienta Lucidchart para la entrega, o prefiere algún formato de archivo específico?",
                timestamp: "14:25",
                sentByMe: false,
            },
            {
                id: "m1_4",
                senderId: "docente",
                text: "Sí, Lucidchart está excelente. Solo recuerden exportarlo como PDF para adjuntarlo en la plataforma Edutrack.",
                timestamp: "14:28",
                sentByMe: true,
            },
            {
                id: "m1_5",
                senderId: "c_valeria",
                text: "Perfecto profesor, muchas gracias por la aclaración. Que tenga buen día.",
                timestamp: "14:30",
                sentByMe: false,
            },
        ],
    },
    {
        id: "chat2",
        contact: {
            id: "c_carlos",
            name: "Carlos Mendoza",
            role: "Estudiante • Ingeniería de Software",
            type: "estudiante",
            online: false,
        },
        unreadCount: 2,
        messages: [
            {
                id: "m2_1",
                senderId: "docente",
                text: "Carlos, he notado que has faltado a las últimas clases de Ingeniería de Software. ¿Todo bien?",
                timestamp: "Ayer, 09:00",
                sentByMe: true,
            },
            {
                id: "m2_2",
                senderId: "c_carlos",
                text: "Estimado docente, disculpe. Tuve un contratiempo familiar de salud.",
                timestamp: "10:15",
                sentByMe: false,
            },
            {
                id: "m2_3",
                senderId: "c_carlos",
                text: "Quería saber si puedo enviarle por aquí los justificantes médicos para no perder la nota del taller.",
                timestamp: "10:16",
                sentByMe: false,
            },
        ],
    },
    {
        id: "chat3",
        contact: {
            id: "c_luis_padre",
            name: "Luis Mendoza (Padre)",
            role: "Padre de Carlos Mendoza",
            type: "padre",
            online: true,
        },
        unreadCount: 0,
        messages: [
            {
                id: "m3_1",
                senderId: "c_luis_padre",
                text: "Buenas tardes Dr. Roberto, le escribo para coordinar una cita con usted sobre la situación académica de mi hijo Carlos.",
                timestamp: "Ayer, 16:30",
                sentByMe: false,
            },
            {
                id: "m3_2",
                senderId: "docente",
                text: "Estimado Luis, un gusto saludarlo. Por supuesto, podemos reunirnos virtualmente o en cubículo este viernes a las 11:00 AM.",
                timestamp: "Ayer, 17:00",
                sentByMe: true,
            },
            {
                id: "m3_3",
                senderId: "c_luis_padre",
                text: "Excelente, el viernes a las 11:00 AM me viene genial. ¿Me podría enviar el enlace de Zoom por este medio?",
                timestamp: "Ayer, 17:15",
                sentByMe: false,
            },
            {
                id: "m3_4",
                senderId: "docente",
                text: "Perfecto. Le estaré enviando la invitación de Teams o Zoom el día jueves por la tarde. Quedamos en eso.",
                timestamp: "Ayer, 17:30",
                sentByMe: true,
            },
        ],
    },
    {
        id: "chat4",
        contact: {
            id: "c_ana_colega",
            name: "Dra. Ana María Silva",
            role: "Colega • Docente de Redes I",
            type: "colega",
            online: true,
        },
        unreadCount: 0,
        messages: [
            {
                id: "m4_1",
                senderId: "c_ana_colega",
                text: "Roberto, ¿tienes a la mano el temario actualizado del módulo de patrones de diseño?",
                timestamp: "Lunes, 11:12",
                sentByMe: false,
            },
            {
                id: "m4_2",
                senderId: "docente",
                text: "Hola Ana. Sí, dame unos minutos y te lo comparto en la carpeta del drive compartido de la facultad.",
                timestamp: "Lunes, 11:20",
                sentByMe: true,
            },
            {
                id: "m4_3",
                senderId: "c_ana_colega",
                text: "Muchas gracias, me servirá para coordinar la práctica integradora del mes.",
                timestamp: "Lunes, 11:22",
                sentByMe: false,
            },
        ],
    },
    {
        id: "chat5",
        contact: {
            id: "c_sofia",
            name: "Sofía Castro",
            role: "Estudiante • Ingeniería de Software",
            type: "estudiante",
            online: false,
        },
        unreadCount: 0,
        messages: [
            {
                id: "m5_1",
                senderId: "c_sofia",
                text: "Profesor, logré resolver el bug en la arquitectura del proyecto final, ya funciona el login.",
                timestamp: "Hace 3 días",
                sentByMe: false,
            },
            {
                id: "m5_2",
                senderId: "docente",
                text: "¡Excelente Sofía! Gran trabajo. Recuerda sustentar esa refactorización en el informe final de arquitectura.",
                timestamp: "Hace 3 días",
                sentByMe: true,
            },
        ],
    },
];


