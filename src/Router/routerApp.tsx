import { BrowserRouter, Route, Router, Link, NavLink, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { routes } from './page';
import { lazy, Suspense, useEffect, useState } from 'react';
import { ProtectorRoute } from './Components/ProtectorRoute';
import { useSelector } from 'react-redux';
import { LibresRoute } from './Components/LibresRoute';
import { SelectToken } from '../Reducers/Slices/LoginSlice';
import { Authenticacion } from '../Service/ApiRRHH/Authenticacion';
import { AutenticacionDto } from '../Service/ApiRRHH/Interfaces/Authenticacion';
import { ListColaboradores } from '../Pages/Colaboradores/ListColaboradores';

const Login = lazy(() => import('../Pages/Login/login'));
const Home = lazy(() => import('../Pages/Home/home'));
const Colaborador = lazy(() => import('../Pages/Colaboradores/colaborador'));
const Empresa = lazy(() => import('../Pages/Configuracion/Empresa'));

const mdTheme = createTheme();

const initialState: AutenticacionDto = {
    modulos: [],
    nombreCompleto: ''
}

export const Navigation = () => {
    const token = useSelector(SelectToken);
    const [user, setUser] = useState(initialState);

    const [spinner, setSpinner] = useState(true);
    const getAuth = async () => {
        try {
            const { data } = await Authenticacion();
            if (data.status == 1) {
                setUser(data.data);
            }
            else {

            }
        } catch (error) {
            console.log('error');
        }
    };
    useEffect(() => {
        if (token) {
            getAuth();
        } else {
            setSpinner(false)
        }
        return () => {
            setSpinner(false)
        }
    }, [token]);
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <ThemeProvider theme={mdTheme}>
                    <Routes>
                        <Route element={
                            <ProtectorRoute valid={token} children redirrecTo={'/login'} nombreCompleto={user.nombreCompleto} />
                        }>
                            <Route path="/inicio" element={<Home />}></Route>
                            <Route path="/colaborador" element={<ListColaboradores />}></Route>
                            <Route path="/colaborador/crear" element={<Colaborador />}></Route>
                            <Route path="/configuracion/empresas" element={<Empresa />}></Route>
                            <Route path="/configuracion/contratos" element={<Colaborador />}></Route>
                            <Route path="/configuracion/pagos" element={<Colaborador />}></Route>
                            <Route path="/configuracion/seguro" element={<Colaborador />}></Route>
                            <Route path="/configuracion/otros" element={<Colaborador />}></Route>
                        </Route>
                        <Route path='/login' element={
                            <LibresRoute valid={token} redirrecTo={'/inicio'}>
                                <Login />
                            </LibresRoute>
                        }>
                            <Route path="/login" element={<Login />}></Route>
                        </Route>
                        <Route path="/*" element={<Navigate to={routes[0].to} replace />}></Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </Suspense>
    )
}