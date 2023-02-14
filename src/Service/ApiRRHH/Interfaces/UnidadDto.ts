export interface IUnidad{
    id: number,
    nombreUnidad: string
}
export interface ResponseUnidad {
    status: number,
    message: string,
    data: IUnidad[]
}

export interface ResponseCreateUnidad{
    status: number,
    message: string,
    data: any
}
export interface ResponseStoreUnidad{
    status: number,
    message: string,
    data:any
}
export interface ResponseEditUnidad{
    status: number,
    message: string,
    data:IUnidad
}
export interface ResponseUpdateUnidad{
    status: number,
    message: string,
    data:any
}
export interface ResponseDeleteUnidad{
    status: number;
    message: string;
    data:any
}