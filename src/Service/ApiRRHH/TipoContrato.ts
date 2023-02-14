import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import {
    ResponseCreateTipoContrato,
    ResponseStoreTipoContrato,
    ResponseTipoContrato,
    ResponseEditarTipoContrato,
    ResponseUpdateTipoContrato,
    ResponseDeleteTipoContrato
} from './Interfaces/TipoContratoDto';


//llamada a interceptor
AxiosRequest();
export async function GetTipoContrato() {
    return await axios.get<ResponseTipoContrato>(`${process.env.REACT_APP_API_RRHH}/api/tipo-contrato`);
}
export async function CreateTipoContratoService() {
    return await axios.get<ResponseCreateTipoContrato>(`${process.env.REACT_APP_API_RRHH}/api/tipo-contrato/create`);
}
export async function StoreTipoContratoService(nombreTipoContrato: string) {
    return await axios.post<ResponseStoreTipoContrato>(`${process.env.REACT_APP_API_RRHH}/api/tipo-contrato/store`, { nombreTipoContrato });
}
export async function EditTipoContratoService(id: number) {
    return await axios.get<ResponseEditarTipoContrato>(`${process.env.REACT_APP_API_RRHH}/api/tipo-contrato/edit/${id}`);
}
export async function UpdateTipoContratoService(id: number, nombreTipoContrato: string) {
    return await axios.put<ResponseUpdateTipoContrato>(`${process.env.REACT_APP_API_RRHH}/api/tipo-contrato/update/${id}`, { nombreTipoContrato });
}
export async function DeleteTipoContratoService(id: number) {
    return await axios.delete<ResponseDeleteTipoContrato>(`${process.env.REACT_APP_API_RRHH}/api/tipo-contrato/delete/${id}`)
}