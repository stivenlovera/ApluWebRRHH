import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseDateTable } from './Interfaces/CargoDto';

//llamada a interceptor
AxiosRequest();
export async function GetCargoService() {
    return await axios.get<ResponseDateTable>(`${process.env.REACT_APP_API_RRHH}/cargo`);
}


