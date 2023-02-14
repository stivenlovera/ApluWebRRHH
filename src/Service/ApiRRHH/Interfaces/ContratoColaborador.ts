import { ClasificacionLaboral } from "./ClasificacionLaboralDto"
import { IModalidadContrato } from "./ModalidadContrato"
import { ITipoContrato } from "./TipoContratoDto"

export interface ResponseCreateContratoColaborador {
    status: number,
    message: string,
    data: ICreateContratoColaborador
}
export interface ICreateContratoColaborador {
    clasificacionlaboral: ClasificacionLaboral[],
    modalidadContrato: IModalidadContrato[]
    tipoContrato: ITipoContrato[]
}
export interface ResponseStoreContratoColaborador {
    status: number,
    message: string,
    data: any
}
export interface ResponseEditContratoColaborador {
    status: number,
    message: string,
    data: IContratoColaborador
}
export interface ResponseUpdateContratoColaborador {
    status: number,
    message: string,
    data: IContratoColaborador
}
export interface ResponseDeleteContratoColaborador {
    status: number;
    message: string;
    data: any
}
export interface IContratoColaborador {
    id: number;
    ci:'',
    codigoColaborador:'',
    nombreCompleto:'',
    modalidadContrato: string;
    clasificacionLaboral: string;
    haberBasico: string;
    modoHaberBasico: string;
    modoQuincena: string;
    tipoContrato:string;
    motivoContrato: string;
    fechaInicio: Date;
    fechaFinalizacion: Date;
    fechaRatificacion: Date;
    haberQuincena: string;
    aplicaAguinaldo: string;
    aplicaSegundoAguinaldo: string;
}
export interface ResponseDateTableContratoColaborador {
    status: number,
    message: string,
    data: IContratoColaborador[]
}