import { lazy, LazyExoticComponent } from "react";

type JSXComponent = () => JSX.Element;

export interface Route {
    to: string;
    path: string;
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
}
const login = lazy(() => import('../Pages/Login/login'));
const home = lazy(() => import('../Pages/Home/home'));
const colaboradores = lazy(() => import('../Pages/Colaboradores/colaboradores'));
const colaborador = lazy(() => import('../Pages/Colaboradores/colaborador'));
const miRed = lazy(() => import('../Pages/MiRed/miRed'));
export const routes: Route[] = [
    {
        path: "/login",
        to: "/login",
        Component: login,
        name: "Login"
    },
    {
        path: "/bienvenido",
        to: "/bienvenido",
        Component: home,
        name: "Login"
    },
    {
        path: "/mi-red",
        to: "/mi-red",
        Component: miRed,
        name: "MiRed"
    },
    {
        path: "/colaboradores",
        to: "/colaboradores",
        Component: colaborador,
        name: "MiRed"
    }
]