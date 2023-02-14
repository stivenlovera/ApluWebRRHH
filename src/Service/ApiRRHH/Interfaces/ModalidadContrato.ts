export interface IModalidadContrato {
    id: number
    nombreModContrato: string
    dias:number;
}
export interface ResponseModalidadContrato {
    status: number,
    message: string,
    data: IModalidadContrato[]
}
export interface ResponseCreateModalidadContrato {
    status: number,
    message: string,
    data: any
}
export interface ResponseStoreModalidadContrato {
    status: number,
    message: string,
    data: any
}
export interface ResponseEditarModalidadContrato {
    status: number,
    message: string,
    data: IModalidadContrato
}
export interface ResponseUpdateModalidadContrato {
    status: number,
    message: string,
    data: any
}
export interface ResponseDeleteModalidadContrato {
    status: number,
    message: string,
    data: any
}
