import { EstadoCivil } from "./EstadoCivilDto"
import { TipoDocumento } from "./TipoDocumentoDto"
import { Departamento } from './DepartamentoDto';
import { IUnidad } from "./UnidadDto";
import { ISucursal } from "./SucursalDto";
import { ICargo } from "./CargoDto";
import { ClasificacionLaboral } from "./ClasificacionLaboralDto";
import { IModalidadContrato } from './ModalidadContrato';
import { ITipoContrato } from "./TipoContratoDto";
import { InformacionContable } from "./InformacionContable";
import { CentroCosto } from "./CentroCosto";
import { FormaPago } from "./FormaPago";
import { TipoCuenta } from "./TipoCuenta";
import { Banco } from "./BancoDto";
import { AdministracionPesiones } from "./AdministracionPensionesDto";
import { CajaSalud } from "./CajaSaludDto";
import { FormacionPrincipal } from "./FomacionPrincipal";
import { Pais } from "./PaisDto";
import { Sexo } from "./SexoDto";
export interface ResponseDataTable{
    status: number,
    message: string,
    data: ColaboradorDataTable[]
}
export interface ColaboradorDataTable {
    id: number;
    ci: string;
    codColaborador: string;
    nombreCompleto: string;
    cargo: string;
    sucursal: string;
    oficina: string;
    tipoContrato: string;
    ModoContrato: string;
}

export interface ResponseCreateColaborador {
    status: number;
    message: string;
    data: Colaborador;
}

export interface Colaborador {
    tipoDocumento: TipoDocumento[];
    departamento: Departamento[];
    pais: Pais[];
    estadoCivil: EstadoCivil[];
    unidad: IUnidad[]
    sucursal: ISucursal[]
    cargo: ICargo[]
    clasificacionlaboral: ClasificacionLaboral[],
    modalidadContrato: IModalidadContrato[]
    tipoContrato: ITipoContrato[]
    informacionContable: InformacionContable[],
    centroCosto: CentroCosto[]
    formaPago: FormaPago[]
    tipoCuenta: TipoCuenta[]
    banco: Banco[],
    administracionPensiones: AdministracionPesiones[],
    cajaSalud: CajaSalud[]
    formacionPrincial: FormacionPrincipal[]
    sexo: Sexo[]
}
export interface CreateColaborador {
    ci: string;
    nombre1: string;
    nombre2: string;
    nombre3: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    apellidoCasado: string;
    fechaNacimiento: Date;
    tipoDocumento: TipoDocumento[];
    departamento: Departamento[];
    pais: Pais[];
    estadoCivil: EstadoCivil[];
    unidad: IUnidad[]
    sucursal: ISucursal[]
    cargo: ICargo[]
    clasificacionlaboral: ClasificacionLaboral[],
    modalidadContrato: IModalidadContrato[]
    tipoContrato: ITipoContrato[]
    informacionContable: InformacionContable[],
    centroCosto: CentroCosto[]
    formaPago: FormaPago[]
    tipoCuenta: TipoCuenta[]
    banco: Banco[],
    administracionPensiones: AdministracionPesiones[],
    cajaSalud: CajaSalud[]
    formacionPrincial: FormacionPrincipal[]
    sexo: Sexo[]
}

export interface StoreColaborador {
    ci: string,
    nombre1: string,
    nombre2: string,
    nombre3: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    apellidoCasado: string,
    fechaNacimiento: Date,
    vencimientoDocumento: Date,
    vencimientoLicConducir: Date,
    lugarNacimiento: string;
    licenciaConducir: string;
    telefonoFijo: string;
    Celular: string;
    telefonoFijoTrabajo: string;
    ContactoEmegencia: string;
    TelefonoEmergencia: string;
    TipoSangre: string;
    FactorSangre: string;
    Dirrecion: string;
    Email: string;
    tipoDocumento: string;
    nacionalidad: string;
    departamento: string;
    estadoCivil: string;
    conyugeNombreCompleto: string;
    conyugeLugarNacimiento: string;
    conyugeFechaNacimiento: Date,
    codigoColaborador: string;
    fechaIngreso: Date;
    fechaIngresoVacaciones: Date;
    fechaIngresoVacacionesAnt: Date;
    fechaIngresoBonoAntiguedad: Date;
    viviendaPropia: string;
    vehiculoPropio: string;
    oficina: string;
    ModohaberBasico: string;
    haberBasico: string;
    ModoQuincena: string;
    HaberQuincena: string;
    telefonoLaboral: string;
    celularLaboral: string;
    dirrecionLaboral: string;
    emailLaboral: string;
    motivoContrato: string;
    fechaFinalizacion: Date;
    fechaRatificacion: Date;
    excliblePlanilla: string;
    aguinaldoMes1: string;
    aplica2aguinaldo: string;
    aplicaRetroactivos: string;
    aplicaPrima: string;
    enviarBoletaPago: string;
    indemnizacionQuinquenios: string;
    indemnizacion: string;
    porcentajeCentroCosto: string;
    cuentaBancaria: string;
    aplicaAFP: string;
    nroAFP: string;
    jubilado: string;
    aportaAFP: string;
    aplicaCajaSalud: string;
    nroAsegurado: string;
    discapacidad: string;
    requiereApruebeVacaciones: string;
    valorLunes: string;
    valorMartes: string;
    valorMiercoles: string;
    valorJueves: string;
    valorViernes: string;
    valorSabado: string;
    valorDomingo: string;
    codigoAsistencia: string;
    diasporMes: string;
    controlarAsistencia: string;
    bonoExtra: string;
    bonoExtraNocturna: string;
    horasParaHorasExtras: string;
    horasPorDia: string;
    descuentoPorFalta: string;
    descuentoPorAtraso: string;
    dominicales: string;
    trabajaDomingo: string;
    HorasPlanillas: string;
    unidad: string;
    sucursal: string;
    cargo: string;
    clasificacionlaboral: string;
    modalidadContrato: string;
    tipoContrato: string;
    informacionContable: string;
    centroCosto: string;
    formaPago: string;
    tipoCuenta: string;
    banco: string;
    administracionPensiones: string;
    cajaSalud: string;
    formacionPrincial: string;
    sexo: string;
}
export interface ResponseStoreColaborador {
    status: number,
    message: string,
    data: Colaborador
}