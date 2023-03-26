import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { ResponseHomeTarjetaDto } from './Interfaces/HomeServiceDto';


//llamada a interceptor
AxiosRequest();

export async function HomeTarjetaServicio() {
    return await axios.get<ResponseHomeTarjetaDto>(`${process.env.REACT_APP_API_RRHH}/api/home/tarjeta`);
}
