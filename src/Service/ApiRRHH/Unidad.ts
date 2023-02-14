import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseUnidad, ResponseCreateUnidad, ResponseStoreUnidad, ResponseEditUnidad, ResponseUpdateUnidad, ResponseDeleteUnidad } from './Interfaces/UnidadDto';

//llamada a interceptor
AxiosRequest();
export async function GetUnidadService() {
    return await axios.get<ResponseUnidad>(`${process.env.REACT_APP_API_RRHH}/api/unidad`);
}
export async function CreateUnidadService() {
    return await axios.get<ResponseCreateUnidad>(`${process.env.REACT_APP_API_RRHH}/api/unidad/create`);
}
export async function StoreUnidadService(nombreUnidad: string) {
    return await axios.post<ResponseStoreUnidad>(`${process.env.REACT_APP_API_RRHH}/api/unidad/store`, { nombreUnidad });
}
export async function EditUnidadService(id: number) {
    return await axios.get<ResponseEditUnidad>(`${process.env.REACT_APP_API_RRHH}/api/unidad/edit/${id}`);
}
export async function UpdateUnidadService(id: number, nombreUnidad: string) {
    return await axios.put<ResponseUpdateUnidad>(`${process.env.REACT_APP_API_RRHH}/api/unidad/update/${id}`, { nombreUnidad });
}
export async function DeleteUnidadService(id: number) {
    return await axios.delete<ResponseDeleteUnidad>(`${process.env.REACT_APP_API_RRHH}/api/unidad/delete/${id}`)
}