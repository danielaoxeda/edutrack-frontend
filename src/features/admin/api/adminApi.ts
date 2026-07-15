import api from "../../../lib/api.ts";
import axios from "axios";

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
        docenteId: number | undefined;
        estudianteId: number | undefined;
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
        estado: string;
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
    const { data } = await api.get<AdminOverview>("/admin/overview");
    return data;
}

export async function createTeacher(payload: TeacherCreatePayload) {
    const { data } = await api.post("/admin/docentes", payload);
    return data;
}

export async function createStudent(payload: StudentCreatePayload) {
    const { data } = await api.post("/admin/estudiantes", payload);
    return data;
}

export async function updateTeacherStatus(docenteId: number, estado: "ACTIVO" | "INACTIVO") {
    await api.patch(`/admin/docentes/${docenteId}/estado`, { estado });
}

export async function updateStudentStatus(estudianteId: number, estado: "ACTIVO" | "INACTIVO") {
    await api.patch(`/admin/estudiantes/${estudianteId}/estado`, { estado });
}

export async function createCourse(payload: CourseCreatePayload) {
    const { data } = await api.post("/cursos", payload);
    return data;
}

export async function createSection(payload: SectionCreatePayload) {
    const { data } = await api.post("/secciones", payload);
    return data;
}

export async function assignTeacherToSection(payload: TeacherSectionAssignmentPayload) {
    try {
        const { data } = await api.post("/docente-secciones", payload);
        return data;
    } catch (error) {
        throw normalizeAdminApiError(error, "No se pudo asignar el profesor a la seccion");
    }
}

export async function enrollStudentInSection(payload: StudentEnrollmentPayload) {
    try {
        const { data } = await api.post("/matriculas", payload);
        return data;
    } catch (error) {
        throw normalizeAdminApiError(error, "No se pudo matricular el estudiante");
    }
}

function normalizeAdminApiError(error: unknown, fallback: string) {
    if (axios.isAxiosError<{ mensaje?: string }>(error)) {
        return new Error(error.response?.data?.mensaje ?? fallback);
    }

    return error instanceof Error ? error : new Error(fallback);
}
