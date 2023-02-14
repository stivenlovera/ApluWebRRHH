export interface ITipoContrato {
    id: number
    nombreTipoContrato: string
}

export interface ResponseTipoContrato {
    status: number,
    message: string,
    data: ITipoContrato[]
}
export interface ResponseCreateTipoContrato {
    status: number,
    message: string,
    data: any
}
export interface ResponseStoreTipoContrato {
    status: number,
    message: string,
    data: any
}
export interface ResponseEditarTipoContrato {
    status: number,
    message: string,
    data: ITipoContrato
}
export interface ResponseUpdateTipoContrato {
    status: number,
    message: string,
    data: any
}
export interface ResponseDeleteTipoContrato {
    status: number,
    message: string,
    data: any
}
