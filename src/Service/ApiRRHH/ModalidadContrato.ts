import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import {
    IModalidadContrato,
    ResponseCreateModalidadContrato,
    ResponseStoreModalidadContrato,
    ResponseEditarModalidadContrato,
    ResponseUpdateModalidadContrato,
    ResponseDeleteModalidadContrato,
    ResponseModalidadContrato
} from './Interfaces/ModalidadContrato';

//llamada a interceptor
AxiosRequest();
export async function GetModalidadContratoService() {
    return await axios.get<ResponseModalidadContrato>(`${process.env.REACT_APP_API_RRHH}/api/modo-contrato`);
}
export async function CreateModalidadService() {
    return await axios.get<ResponseCreateModalidadContrato>(`${process.env.REACT_APP_API_RRHH}/api/modo-contrato/create`);
}
export async function StoreModalidadService(nombreModalidad: string, dias: number) {
    return await axios.post<ResponseStoreModalidadContrato>(`${process.env.REACT_APP_API_RRHH}/api/modo-contrato/store`, { nombreModalidad, dias });
}
export async function EditModalidadService(id: number) {
    return await axios.get<ResponseEditarModalidadContrato>(`${process.env.REACT_APP_API_RRHH}/api/modo-contrato/edit/${id}`);
}
export async function UpdateModalidadService(id: number, nombreModalidad: string, dias: number) {
    return await axios.put<ResponseUpdateModalidadContrato>(`${process.env.REACT_APP_API_RRHH}/api/modo-contrato/update/${id}`, { nombreModalidad, dias });
}
export async function DeleteModalidadService(id: number) {
    return await axios.delete<ResponseDeleteModalidadContrato>(`${process.env.REACT_APP_API_RRHH}/api/modo-contrato/delete/${id}`)
}