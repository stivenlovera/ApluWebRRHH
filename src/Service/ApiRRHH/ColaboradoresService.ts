import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseCreateColaborador, ResponseDataTable, ResponseStoreColaborador, StoreColaborador } from './Interfaces/ColaboradorDto';

//llamada a interceptor
AxiosRequest();
export async function GetColaboradorService() {
    return await axios.get<ResponseDataTable>(`${process.env.REACT_APP_API_RRHH}/api/colaborador/data-table`);
}
export async function CreateColaboradorService() {
    return await axios.get<ResponseCreateColaborador>(`${process.env.REACT_APP_API_RRHH}/api/colaborador/create`);
}
export async function StoreColaboradorService(storeColaborador: StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/api/colaborador/store`, storeColaborador);
}
export async function EditColaboradorService(storeColaborador: StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/api/colaborador/store`, storeColaborador);
}
export async function UpdateColaboradorService(storeColaborador: StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/api/colaborador/store`, storeColaborador);
}
export async function DeleteColaboradorService(storeColaborador: StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/api/colaborador/store`, storeColaborador);
}


