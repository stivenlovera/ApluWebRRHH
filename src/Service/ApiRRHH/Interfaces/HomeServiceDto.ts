import { CCardResumenProps } from "../../../Pages/Home/CCardResumen/CCardResumen";

export interface ResponseHomeTarjetaDto {
    status: number,
    message: string,
    data: CCardResumenProps[]
}
