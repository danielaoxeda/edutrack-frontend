// src/data/mock/activitiesMock.ts
import type { Activity } from '../../types/activity';

export const mockActivities: Activity[] = [
    {
        id: 1,
        titulo: 'Proyecto Final: Implementación de Microservicios con Node.js y React.',
        descripcion: 'Entrega del proyecto final del curso Desarrollo Web Full Stack.',
        fechaLimite: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Mañana
        estado: 'Pendiente',
        cursoNombre: 'Desarrollo Web Full Stack',
    },
    {
        id: 2,
        titulo: 'Avance de portafolio 3',
        descripcion: 'Avance del portafolio para el curso Diseño de Productos y Servicios.',
        fechaLimite: '2026-05-30T23:59:00',
        estado: 'Entregado',
        cursoNombre: 'Diseño de Productos y Servicios',
    },
    {
        id: 3,
        titulo: 'Práctica Calificada 2',
        descripcion: 'Segunda práctica calificada de Lenguajes de Programación.',
        fechaLimite: new Date().toISOString(), // Hoy
        estado: 'Calificado',
        cursoNombre: 'Lenguajes de Programación',
    },
    {
        id: 4,
        titulo: 'Avance de proyecto 2',
        descripcion: 'Avance del proyecto para el curso Herramientas de desarrollo.',
        fechaLimite: '2026-06-02T23:59:00',
        estado: 'Pendiente',
        cursoNombre: 'Herramientas de desarrollo',
    },
];