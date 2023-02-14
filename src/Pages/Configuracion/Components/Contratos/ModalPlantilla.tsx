
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, TextField } from '@mui/material';
import { UseDataTableTipoContrato } from '../hooks/useDataTableTipoContrato';
import { UseDataTablePlantilla } from '../hooks/UseDataTablePlantilla';

interface ModalPlantillaProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
export const ModalPlantilla = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalPlantillaProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const useDataTablePlantilla = UseDataTablePlantilla({ closeModal, open, titulo, tipo, id, nombreAceptar, nombreCancelar });

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={closeModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {titulo}
                </DialogTitle>
                <DialogContent>
                    {
                        tipo == 'eliminar' ? (<></>) : (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="nombreModContrato"
                                        label="Nombre Modalidad contrato"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTablePlantilla.handleBlur}
                                        onChange={useDataTablePlantilla.handleChange}
                                        helperText={useDataTablePlantilla.errors.nombreModContrato}
                                        error={!!useDataTablePlantilla.errors.nombreModContrato}
                                        value={useDataTablePlantilla.values.nombreModContrato}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="dias"
                                        label="Dias contrato"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTablePlantilla.handleBlur}
                                        onChange={useDataTablePlantilla.handleChange}
                                        helperText={useDataTablePlantilla.errors.dias}
                                        error={!!useDataTablePlantilla.errors.dias}
                                        value={useDataTablePlantilla.values.dias}
                                    />
                                </Grid>
                            </Grid>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal}>
                        {nombreCancelar}
                    </Button>
                    <Button autoFocus onClick={useDataTablePlantilla.onSave}>
                        {nombreAceptar}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
