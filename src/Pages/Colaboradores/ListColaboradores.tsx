import React from 'react'
import DataGrid from './colaboradores'
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CTipografia } from '../../Components/Labels/CTipografia';

export const ListColaboradores = () => {
    return (
        <>
            <CTipografia
                titulo='Lista colaboradores'
                descripcion='Informacion general de colaboradores'
            />
            <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >registrar nuevo</Button>
            <DataGrid />
        </>
    )
}
