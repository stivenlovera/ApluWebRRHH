import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import DataGrid from '../Colaboradores/colaboradores'
import { DataTableCargo } from './Components/DataTableCargo'
import { DataTableUnidad } from './Components/DataTableUnidad'

const Empresa = () => {
  return (
    <>
      <Typography variant='h6' sx={{ mb: 1 }}>Lista Unidad Organizacional</Typography>
      <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >Registrar unidad</Button>
      <DataTableUnidad />
      <Typography variant='h6' sx={{ mb: 1 }}>Lista Cargo</Typography>
      <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >Registrar Cargo</Button>
      <DataTableCargo />
      <Typography variant='h6' sx={{ mb: 1 }}>Lista Sucursal</Typography>
      <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >Registrar Sucursal</Button>
      <DataGrid />
      <Typography variant='h6' sx={{ mb: 1 }}>Lista Oficina</Typography>
      <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >Registrar Oficina</Button>
      <DataGrid />
    </>
  )
}
export default Empresa;