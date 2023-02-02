export interface IUnidad{
    id: number,
    nombreUnidad: string
}
export interface ResponseUnidad {
    status: number,
    message: string,
    data: IUnidad[]
}