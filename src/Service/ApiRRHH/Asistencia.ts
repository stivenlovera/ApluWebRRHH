import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseStoreAsistencia,ResponseCreateAsistencia,ResponseDateTableAsistencia,ResponseDeleteAsistencia,ResponseEditAsistencia,ResponseUpdateAsistencia } from './Interfaces/AsistenciaDto';

//llamada a interceptor
AxiosRequest();
export async function GetAsistenciaService() {
    return await axios.get<ResponseDateTableAsistencia>(`${process.env.REACT_APP_API_RRHH}/api/asistencia`);
}
export async function CreateAsistenciaService() {
    return await axios.get<ResponseCreateAsistencia>(`${process.env.REACT_APP_API_RRHH}/api/asistencia/create`);
}
export async function StoreAsistenciaService(nombreCargo: string) {
    return await axios.post<ResponseStoreAsistencia>(`${process.env.REACT_APP_API_RRHH}/api/asistencia/store`, { nombreCargo });
}
export async function EditAsistenciaService(id: number) {
    return await axios.get<ResponseEditAsistencia>(`${process.env.REACT_APP_API_RRHH}/api/asistencia/edit/${id}`);
}
export async function UpdateAsistenciaService(id: number, nombreCargo: string) {
    return await axios.put<ResponseUpdateAsistencia>(`${process.env.REACT_APP_API_RRHH}/api/asistencia/update/${id}`, { nombreCargo });
}
export async function DeleteAsistenciaService(id: number) {
    return await axios.delete<ResponseDeleteAsistencia>(`${process.env.REACT_APP_API_RRHH}/api/asistencia/delete/${id}`);
}


