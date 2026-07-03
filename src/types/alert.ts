export interface AlertaAcademica {
    id: number;
    matriculaId: number;
    estudianteCodigo: string;
    seccionNombre: string;
    tipo: "RIESGO" | "TARDANZA";
    descripcion: string;
    fechaAlerta: string;

}