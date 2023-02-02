import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseCreateColaborador, ResponseStoreColaborador, StoreColaborador } from './Interfaces/ColaboradorDto';

//llamada a interceptor
AxiosRequest();
export async function GetColaboradorService() {
    return await axios.get<any>(`${process.env.REACT_APP_API_RRHH}/colaborador/data-table`);
}
export async function CreateColaboradorService() {
    return await axios.get<ResponseCreateColaborador>(`${process.env.REACT_APP_API_RRHH}/colaborador/create`);
}
export async function StoreColaboradorService(storeColaborador:StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/colaborador/store`,storeColaborador);
}
export async function EditColaboradorService(storeColaborador:StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/colaborador/store`,storeColaborador);
}
export async function UpdateColaboradorService(storeColaborador:StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/colaborador/store`,storeColaborador);
}
export async function DeleteColaboradorService(storeColaborador:StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/colaborador/store`,storeColaborador);
}


