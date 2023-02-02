import axios from 'axios';
import { AxiosRequest } from '../../Utils/Axios';
import { responseAutenticacionDto } from './Interfaces/Authenticacion';
import { loginDto, responseLoginDto } from './Interfaces/Login';

//llamada a interceptor
AxiosRequest();

export async function LoginAuthenticacion(data: loginDto) {
    return await axios.post<responseLoginDto>(`${process.env.REACT_APP_API_RRHH}/auth/login`, data);
}
export async function LogoutAuthenticacion() {
    return await axios.get<responseAutenticacionDto>(`${process.env.REACT_APP_API_RRHH}/auth/logout`);
}
export async function Authenticacion() {
    return await axios.get<responseAutenticacionDto>(`${process.env.REACT_APP_API_RRHH}/auth`);
}
