import React from 'react'
import DataGrid from './colaboradores'
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const ListColaboradores = () => {
    return (
        <>
            <Typography variant='h6' sx={{ mb: 1 }}>Lista de colaboradores</Typography>
            <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >registrar nuevo</Button>
            <DataGrid />
        </>
    )
}
