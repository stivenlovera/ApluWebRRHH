import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseUnidad } from './Interfaces/UnidadDto';

//llamada a interceptor
AxiosRequest();
export async function GetUnidadService() {
    return await axios.get<ResponseUnidad>(`${process.env.REACT_APP_API_RRHH}/unidad`);
}
