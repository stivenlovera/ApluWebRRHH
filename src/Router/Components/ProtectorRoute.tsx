import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../../Components/Sidebar/sidebar";


interface Props {
    valid: boolean;
    children: React.ReactNode;
    redirrecTo: string;
    nombreCompleto: string;
}

export const ProtectorRoute = ({ children, valid, redirrecTo, nombreCompleto }: Props) => {
    //console.log('verificando',valid)
    if (!valid) {
        return (<Navigate to={redirrecTo} />)
    }
    else {
        return (<SideBar nombreCompleto={nombreCompleto}><Outlet /></SideBar>);
    }
}
