import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseDateTable, ResponseStoreCargo, ResponseEditCargo, ResponseUpdateCargo, ResponseDeleteCargo } from './Interfaces/CargoDto';

//llamada a interceptor
AxiosRequest();
export async function GetCargoService() {
    return await axios.get<ResponseDateTable>(`${process.env.REACT_APP_API_RRHH}/api/cargo`);
}
export async function CreateCargoService() {
    return await axios.get<ResponseDateTable>(`${process.env.REACT_APP_API_RRHH}/api/cargo/create`);
}
export async function StoreCargoService(nombreCargo: string) {
    return await axios.post<ResponseStoreCargo>(`${process.env.REACT_APP_API_RRHH}/api/cargo/store`, { nombreCargo });
}
export async function EditCargoService(id: number) {
    return await axios.get<ResponseEditCargo>(`${process.env.REACT_APP_API_RRHH}/api/cargo/edit/${id}`);
}
export async function UpdateCargoService(id: number, nombreCargo: string) {
    return await axios.put<ResponseUpdateCargo>(`${process.env.REACT_APP_API_RRHH}/api/cargo/update/${id}`, { nombreCargo });
}
export async function DeleteCargoService(id: number) {
    return await axios.delete<ResponseDeleteCargo>(`${process.env.REACT_APP_API_RRHH}/api/cargo/delete/${id}`);
}


