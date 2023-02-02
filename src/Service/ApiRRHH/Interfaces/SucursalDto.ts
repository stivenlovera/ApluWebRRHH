export interface ISucursal {
    id: number;
    nombreSucursal: string;
    direccion: string;
}
export interface ResponseCreateColaborador {
    status: number,
    message: string,
    data: ISucursal[]
}