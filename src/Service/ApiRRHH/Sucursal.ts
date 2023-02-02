import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseCreateColaborador, ResponseStoreColaborador, StoreColaborador } from './Interfaces/ColaboradorDto';

//llamada a interceptor
AxiosRequest();
export async function GetSucursalService() {
    return await axios.get<any>(`${process.env.REACT_APP_API_RRHH}/colaborador/data-table`);
}
export async function CreateSucursalService() {
    return await axios.get<ResponseCreateColaborador>(`${process.env.REACT_APP_API_RRHH}/colaborador/create`);
}
export async function StoreSucursalService(storeColaborador:StoreColaborador) {
    return await axios.post<ResponseStoreColaborador>(`${process.env.REACT_APP_API_RRHH}/colaborador/store`,storeColaborador);
}

