export interface ISucursal {
    id: number;
    nombreSucursal: string;
    direccion: string;
}
export interface ResponseSucursal {
    status: number,
    message: string,
    data: ISucursal[]
}
export interface ResponseCreateSucursal {
    status: number,
    message: string,
    data: any
}
export interface ResponseStoreSucursal {
    status: number,
    message: string,
    data: any
}
export interface ResponseEditarSucursal {
    status: number,
    message: string,
    data: ISucursal
}
export interface ResponseUpdateSucursal {
    status: number,
    message: string,
    data: any
}
export interface ResponseDeleteSucursal {
    status: number,
    message: string,
    data: any
}
