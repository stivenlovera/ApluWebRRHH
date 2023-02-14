export interface ResponseCreateCargo{
    status: number,
    message: string,
    data: ICargo[]
}
export interface ResponseStoreCargo{
    status: number,
    message: string,
    data:any
}
export interface ResponseEditCargo{
    status: number,
    message: string,
    data:ICargo
}
export interface ResponseUpdateCargo{
    status: number,
    message: string,
    data:ICargo
}
export interface ResponseDeleteCargo{
    status: number;
    message: string;
    data:any
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