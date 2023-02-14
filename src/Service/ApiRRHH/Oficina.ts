import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseOficina, ResponseStoreOficina, ResponseEditarOficina, ResponseUpdateOficina, ResponseDeleteOficina, ResponseCreateOficina } from './Interfaces/Oficina';
import { ResponseSucursal } from './Interfaces/SucursalDto';

//llamada a interceptor
AxiosRequest();
export async function GetOficinaService() {
    return await axios.get<ResponseOficina>(`${process.env.REACT_APP_API_RRHH}/api/oficina/data-table`);
}
export async function CreateOficinaService() {
    return await axios.get<ResponseSucursal>(`${process.env.REACT_APP_API_RRHH}/api/oficina/create`);
}

export async function StoreOficinaService(nombreOficina: string, sucursalId: number) {
    return await axios.post<ResponseStoreOficina>(`${process.env.REACT_APP_API_RRHH}/api/oficina/store`, { nombreOficina, sucursalId });
}
export async function EditOficinaService(id: number) {
    return await axios.get<ResponseEditarOficina>(`${process.env.REACT_APP_API_RRHH}/api/oficina/edit/${id}`);
}
export async function UpdateOficinaService(id: number, nombreOficina: string, sucursalId: number) {
    return await axios.put<ResponseUpdateOficina>(`${process.env.REACT_APP_API_RRHH}/api/oficina/update/${id}`, { nombreOficina, sucursalId });
}
export async function DeleteOficinaService(id: number) {
    return await axios.delete<ResponseDeleteOficina>(`${process.env.REACT_APP_API_RRHH}/api/oficina/delete/${id}`)
}
