import type {Entrega} from "../types/activity";
import type {AlertaAcademica} from "../types/alert";
import type {
    AcademicEvent,
    AcademicSummary,
    AcademicStats, AcademicDashboardSummary
} from "../types/academicHistory";

export const createAcademicSummary = (
    periodo:string,
    entregas:Entrega[],
    alertas:AlertaAcademica[]
):AcademicSummary=>{

    return{
        periodo,
        entregas: entregas.filter(
            e=>e.estado==="ENTREGADO"
        ).length,
        pendientes: entregas.filter(
            e=>e.estado!=="ENTREGADO"
        ).length,
        calificadas: entregas.filter(
            e=>e.nota!==null
        ).length,
        alertas: alertas.length

    };

}

export const createAcademicDashboardSummary = (
    entregas: Entrega[],
    alertas: AlertaAcademica[]
): AcademicDashboardSummary => {

    const revisadas = entregas.filter(e => e.nota !== null);

    const promedio =
        revisadas.length > 0
            ? revisadas.reduce((s, e) => s + (e.nota ?? 0), 0) / revisadas.length
            : 0;

    return {
        totalEntregas: entregas.length,
        entregasRevisadas: revisadas.length,
        totalAlertas: alertas.length,
        ultimaActividad: entregas.length ? entregas[0].fechaEntrega : "",
        estado: alertas.length ? "Con alertas" : "Normal",
        promedioGeneral: promedio
    };
};

export const createAcademicStats=(summary:AcademicSummary):AcademicStats=>{

    return{
        entregadas:summary.entregas,
        pendientes:summary.pendientes,
        calificadas:summary.calificadas,
        alertas:summary.alertas,

    };

};

export const createTimeline=(

    entregas:Entrega[],
    alertas:AlertaAcademica[]

):AcademicEvent[]=>{

    const deliveryEvents:AcademicEvent[]=entregas.map(entrega=>({
        id:entrega.id,
        type:"delivery",
        title: entrega.actividad.titulo,
        subtitle: entrega.seccion.nombre,
        date:entrega.fechaEntrega,
        status:entrega.estado

    }));

    const alertEvents:AcademicEvent[]=alertas.map(alert=>({
        id:alert.id,
        type:"alert",
        title:alert.tipo,
        subtitle:alert.descripcion,
        date:alert.fechaAlerta,
        status:"ALERTA"

    }));

    return [...deliveryEvents,...alertEvents].sort(

        (a,b)=>
            new Date(b.date).getTime()
            -
            new Date(a.date).getTime()

    );

};