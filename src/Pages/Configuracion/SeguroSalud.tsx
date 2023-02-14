import { Grid, Typography } from '@mui/material'
import React from 'react'
import { DataTableBancos } from './Components/DataTableBancos'
import { DataTableColaboradorBanco } from './Components/DataTableColaboradorBanco'
import { DataTableFormaPago } from './Components/DataTableFormaPago'
import { DataTableTipoCuenta } from './Components/DataTableTipoCuenta'

const SeguroSalud = () => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Typography variant='h6' sx={{ mb: 2 }}>Seguros y Salud</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
            </Grid>
        </>
    )
}
export default SeguroSalud;