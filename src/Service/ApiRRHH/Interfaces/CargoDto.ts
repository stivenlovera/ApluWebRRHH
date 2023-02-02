export interface ResponseCreateCargo{
    status: number,
    message: string,
    data: ICargo[]
}
export interface ICargo{
    id: number;
    nombreCargo: string;
}
export interface ResponseDateTable{
    status: number,
    message: string,
    data: ICargo[]
}