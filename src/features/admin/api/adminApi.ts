import { request } from "../../../lib/http";

export type AdminOverview = {
    summary: {
        totalUsers: number;
        totalTeachers: number;
        totalStudents: number;
        totalCourses: number;
        totalSections: number;
        totalEnrollments: number;
        activePeriodName: string | null;
    };
    users: Array<{
        id: number;
        fullName: string;
        email: string;
        estado: string;
        createdAt: string | null;
        roles: string[];
        docenteId: number | null;
        estudianteId: number | null;
    }>;
    teachers: Array<{
        id: number;
        fullName: string;
        email: string;
        codigoDocente: string;
        especialidad: string;
        estado: string;
        assignedSections: number;
    }>;
    students: Array<{
        id: number;
        fullName: string;
        email: string;
        codigoEstudiante: string;
        estadoAcademico: string;
        enrollmentCount: number;
    }>;
    courses: Array<{
        id: number;
        codigo: string;
        nombre: string;
        descripcion: string;
        creditos: number;
        seccionesCount: number;
        totalMatriculas: number;
        docentes: string[];
    }>;
    sections: Array<{
        id: number;
        nombre: string;
        cursoId: number;
        cursoNombre: string;
        cursoCodigo: string;
        periodoId: number;
        periodoNombre: string;
        capacidad: number;
        enrolledCount: number;
        docentes: string[];
    }>;
    periods: Array<{
        id: number;
        nombre: string;
        fechaInicio: string;
        fechaFin: string;
        estado: string;
    }>;
    roles: Array<{
        id: number;
        nombre: string;
    }>;
};

export type TeacherCreatePayload = {
    usuario: {
        nombres: string;
        apellidos: string;
        email: string;
        password: string;
        estado: string;
    };
    codigoDocente: string;
    especialidad: string;
};

export type StudentCreatePayload = {
    usuario: {
        nombres: string;
        apellidos: string;
        email: string;
        password: string;
        estado: string;
    };
    codigoEstudiante: string;
    estadoAcademico: string;
};

export type CourseCreatePayload = {
    codigo: string;
    nombre: string;
    descripcion: string;
    creditos: number;
};

export type SectionCreatePayload = {
    cursoId: number;
    periodoAcademicoId: number;
    nombre: string;
    capacidad: number;
};

export type TeacherSectionAssignmentPayload = {
    docenteId: number;
    seccionId: number;
};

export type StudentEnrollmentPayload = {
    estudianteId: number;
    seccionId: number;
    estado?: string;
};

export async function loadAdminOverview(): Promise<AdminOverview> {
    return request<AdminOverview>("/api/admin/overview");
}

export async function createTeacher(payload: TeacherCreatePayload) {
    return request("/api/admin/docentes", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function createStudent(payload: StudentCreatePayload) {
    return request("/api/admin/estudiantes", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function createCourse(payload: CourseCreatePayload) {
    return request("/api/cursos", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function createSection(payload: SectionCreatePayload) {
    return request("/api/secciones", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function assignTeacherToSection(payload: TeacherSectionAssignmentPayload) {
    return request("/api/docente-secciones", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function enrollStudentInSection(payload: StudentEnrollmentPayload) {
    return request("/api/matriculas", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
