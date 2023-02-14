import { Grid } from '@mui/material'
import React from 'react'
import { DataTableBancos } from './Components/DataTableBancos'
import { DataTableColaboradorBanco } from './Components/DataTableColaboradorBanco'
import { DataTableFormaPago } from './Components/DataTableFormaPago'
import { DataTableTipoCuenta } from './Components/DataTableTipoCuenta'

export const FormasPagos = () => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <DataTableColaboradorBanco />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataTableFormaPago />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataTableBancos />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataTableTipoCuenta />
                </Grid>
            </Grid>
        </>
    )
}
