import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { lazy, Suspense, useEffect, useState } from 'react';
import { ProtectorRoute } from './Components/ProtectorRoute';
import { useDispatch, useSelector } from 'react-redux';
import { LibresRoute } from './Components/LibresRoute';
import { SelectToken, setToken } from '../Reducers/Slices/LoginSlice';
import { Authenticacion } from '../Service/ApiRRHH/Authenticacion';
import { AutenticacionDto } from '../Service/ApiRRHH/Interfaces/Authenticacion';
import { ListColaboradores } from '../Pages/Colaboradores/ListColaboradores';
import { Contratos } from '../Pages/Configuracion/Contratos';
import { FormasPagos } from '../Pages/Configuracion/FormasPagos';
import type {} from '@mui/lab/themeAugmentation';
// When using TypeScript 3.x and below
import '@mui/lab/themeAugmentation';

const Login = lazy(() => import('../Pages/Login/login'));
const Home = lazy(() => import('../Pages/Home/home'));
const Colaborador = lazy(() => import('../Pages/Colaboradores/colaborador'));
const Empresa = lazy(() => import('../Pages/Configuracion/Empresa'));
const SeguroSalud = lazy(() => import('../Pages/Configuracion/SeguroSalud'));
const Asistencia=lazy(() => import('../Pages/Asistencia/Asistencia'));
const mdTheme = createTheme(
    {
        components: {
            MuiTimeline: {
              styleOverrides: {
                root: {
                  backgroundColor: 'red',
                },
              },
            },
          },
    }
);

const initialState: AutenticacionDto = {
    modulos: [],
    nombreCompleto: ''
}

export const Navigation = () => {
    const token = useSelector(SelectToken);
    const [user, setUser] = useState(initialState);

    const dispatch = useDispatch();
    const updateToken = (token: boolean) => {
        dispatch(
            setToken({
                token: token
            })
        )
    }

    const [spinner, setSpinner] = useState(true);
    const getAuth = async () => {
        try {
            const { data } = await Authenticacion();
            if (data.status == 1) {
                setUser(data.data);
            }
            else {
                updateToken(false);;
            }
        } catch (error) {
            updateToken(false);
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
                            <Route path="/colaborador/crear" element={<Colaborador tipo='nuevo' />}></Route>
                            <Route path="/colaborador/editar/:id" element={<Colaborador tipo='editar' />}></Route>
                            <Route path="/configuracion/empresas" element={<Empresa />}></Route>
                            <Route path="/configuracion/contratos" element={<Contratos />}></Route>
                            <Route path="/configuracion/entidades-bancarias" element={<FormasPagos />}></Route>
                            <Route path="/configuracion/seguro-salud" element={<SeguroSalud />}></Route>
                            <Route path="/configuracion/otros" element={<Empresa />}></Route>
                            <Route path="/configuracion/asistencia" element={<Asistencia />}></Route>
                        </Route>
                        <Route path='/login' element={
                            <LibresRoute valid={token} redirrecTo={'/inicio'}>
                                <Login />
                            </LibresRoute>
                        }>
                            <Route path="/login" element={<Login />}></Route>
                        </Route>
                        <Route path="/*" element={<Navigate to={'/login'} replace />}></Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </Suspense>
    )
}