import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DataGrid from '../Colaboradores/colaboradores'
import { DataTableCargo } from './Components/DataTableCargo'
import { DataTableUnidad } from './Components/DataTableUnidad'
import { ModalCargo } from './Components/ModalCargo'

const Empresa = () => {
  const [opencargo, setOpencargo] = useState(false)
  const handleClose = () => {
    setOpencargo(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 1 }}>Lista Unidad Organizacional</Typography>
          <Button sx={{ mb: 1 }} variant="contained" onClick={() => {
            setOpencargo(true)
          }} >Registrar unidad</Button>
          <DataTableUnidad />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 1 }}>Lista Cargo</Typography>
          <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >Registrar Cargo</Button>
          <DataTableCargo />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 1 }}>Lista Sucursal</Typography>
          <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >Registrar Sucursal</Button>
          <DataGrid />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 1 }}>Lista Oficina</Typography>
          <Button sx={{ mb: 1 }} variant="contained" component={Link} to="/colaborador/crear" >Registrar Oficina</Button>
          <DataGrid />
        </Grid>
      </Grid>
      <ModalCargo openModal={opencargo}></ModalCargo>
    </>
  )
}
export default Empresa;