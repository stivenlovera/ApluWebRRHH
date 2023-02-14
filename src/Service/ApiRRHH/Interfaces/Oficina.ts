import { ISucursal } from './SucursalDto';
export interface IOficina {
    id: number;
    nombreOficina: string;
    hhrrSucursalId: number;
}
export interface ResponseOficina {
    status: number,
    message: string,
    data: IOficina[]
}
export interface ResponseCreateOficina {
    status: number,
    message: string,
    data: ISucursal[]
}
export interface ResponseStoreOficina {
    status: number,
    message: string,
    data: any
}
export interface ResponseEditarOficina {
    status: number,
    message: string,
    data: IOficina
}
export interface ResponseUpdateOficina {
    status: number,
    message: string,
    data: any
}
export interface ResponseDeleteOficina {
    status: number,
    message: string,
    data: any
}
