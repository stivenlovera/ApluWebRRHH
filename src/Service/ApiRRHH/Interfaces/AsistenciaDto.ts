export interface ResponseCreateAsistencia {
    status: number,
    message: string,
    data: IAsistencia[]
}
export interface ResponseStoreAsistencia {
    status: number,
    message: string,
    data: any
}
export interface ResponseEditAsistencia {
    status: number,
    message: string,
    data: IAsistencia
}
export interface ResponseUpdateAsistencia {
    status: number,
    message: string,
    data: IAsistencia
}
export interface ResponseDeleteAsistencia {
    status: number;
    message: string;
    data: any
}
export interface IAsistencia {
    id: number;
    fechaRegistro: Date;
    fechaEntrada: Date;
    fechaSalida: Date;
    horaEntrada: Date;
    horaSalida: Date;
    nota: string;
    HHRRColaboradorId: number;
}
export interface ResponseDateTableAsistencia {
    status: number,
    message: string,
    data: DateTableAsistencia[]
}
export interface DateTableAsistencia {
    id: number;
    nombreCompleto:string;
    codigoColaborador:string;
    cargo:string;
    fechaRegistro: Date;
    horaEntrada: Date;
    horaSalida: Date;
    nota: string;
    HHRRColaboradorId: number;
}
