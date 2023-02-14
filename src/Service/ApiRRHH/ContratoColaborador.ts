import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { IContratoColaborador, ResponseCreateContratoColaborador, ResponseDateTableContratoColaborador, ResponseEditContratoColaborador, ResponseUpdateContratoColaborador } from './Interfaces/ContratoColaborador';

//llamada a interceptor
AxiosRequest();
export async function GetContratColaboradorDataTableService() {
    return await axios.get<ResponseDateTableContratoColaborador>(`${process.env.REACT_APP_API_RRHH}/api/contrato/create`);
}
export async function CreateContratoColaborador() {
    return await axios.get<ResponseCreateContratoColaborador>(`${process.env.REACT_APP_API_RRHH}/api/contrato/create`);
}
export async function EditContratoColaborador(id:number) {
    return await axios.get<ResponseEditContratoColaborador>(`${process.env.REACT_APP_API_RRHH}/api/contrato/edit/${id}`);
}
export async function UpdateContratoColaborador(id:number,ContratoColaborador:IContratoColaborador) {
    return await axios.put<ResponseUpdateContratoColaborador>(`${process.env.REACT_APP_API_RRHH}/api/contrato/update/${id}`,ContratoColaborador);
}


