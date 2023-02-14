
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

interface ModalTipoContratoProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
export const ModalTipoContrato = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalTipoContratoProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dataTableTipoContrato = UseDataTableTipoContrato({ closeModal, open, titulo, tipo, id, nombreAceptar, nombreCancelar });

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
                        tipo == 'eliminar' ? (<></>) : (<Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="nombreTipoContrato"
                                    label="Nombre Tipo contrato"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onBlur={dataTableTipoContrato.handleBlur}
                                    onChange={dataTableTipoContrato.handleChange}
                                    helperText={dataTableTipoContrato.errors.nombreTipoContrato}
                                    error={!!dataTableTipoContrato.errors.nombreTipoContrato}
                                    value={dataTableTipoContrato.values.nombreTipoContrato}
                                />
                            </Grid>
                        </Grid>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal}>
                        {nombreCancelar}
                    </Button>
                    <Button autoFocus onClick={dataTableTipoContrato.onSave}>
                        {nombreAceptar}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
