import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseCreateSucursal, ResponseEditarSucursal, ResponseStoreSucursal, ResponseUpdateSucursal, ResponseDeleteSucursal, ResponseSucursal } from './Interfaces/SucursalDto';

//llamada a interceptor
AxiosRequest();
export async function GetSucursalService() {
    return await axios.get<ResponseSucursal>(`${process.env.REACT_APP_API_RRHH}/api/sucursal/data-table`);
}
export async function CreateSucursalService() {
    return await axios.get<ResponseCreateSucursal>(`${process.env.REACT_APP_API_RRHH}/api/sucursal/create`);
}
export async function StoreSucursalService(nombreSucursal: string, direccion: string) {
    return await axios.post<ResponseStoreSucursal>(`${process.env.REACT_APP_API_RRHH}/api/sucursal/store`, { nombreSucursal, direccion });
}
export async function EditSucursalService(id: number) {
    return await axios.get<ResponseEditarSucursal>(`${process.env.REACT_APP_API_RRHH}/api/sucursal/edit/${id}`);
}
export async function UpdateSucursalService(id: number, nombreSucursal: string, direccion: string) {
    return await axios.put<ResponseUpdateSucursal>(`${process.env.REACT_APP_API_RRHH}/api/sucursal/update/${id}`, { nombreSucursal, direccion });
}
export async function DeleteSucursalService(id: number) {
    return await axios.delete<ResponseDeleteSucursal>(`${process.env.REACT_APP_API_RRHH}/api/sucursal/delete/${id}`)
}