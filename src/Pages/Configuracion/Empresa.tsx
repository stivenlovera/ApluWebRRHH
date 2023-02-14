import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import DataGrid from '../Colaboradores/colaboradores'
import { DataTableCargo } from './Components/DataTableCargo'
import { DataTableOficina } from './Components/DataTableOficina'
import { DataTableSucursal } from './Components/DataTableSucursal'
import { DataTableUnidad } from './Components/DataTableUnidad'

const Empresa = () => {

  useEffect(() => {


    return () => {

    }
  }, [])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DataTableUnidad />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DataTableCargo />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DataTableSucursal />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DataTableOficina />
        </Grid>
      </Grid>
    </>
  )
}
export default Empresa;