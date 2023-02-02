import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
interface Props {
    valid: boolean;
    children: React.ReactNode;
    redirrecTo: string
}
export const LibresRoute = ({ children, valid, redirrecTo }: Props) => {
    if (valid) {
        return (<Navigate to={redirrecTo} />)
    }
    else {
        return (<Outlet />);
    }
}
