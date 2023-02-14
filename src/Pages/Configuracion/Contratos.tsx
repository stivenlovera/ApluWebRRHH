import { Button, Grid, Typography } from '@mui/material'
import { DataTableContrato } from './Components/Contratos/DataTableContratos'

import { DataTablePlantillas } from './Components/Contratos/DataTablePlantillas'
import { DataTableTipoContrato } from './Components/Contratos/DataTableTipoContrato'

export const Contratos = () => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <DataTableContrato />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataTablePlantillas />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataTableTipoContrato />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataTableTipoContrato />
                </Grid>
            </Grid>
        </>
    )
}
