
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, TextField } from '@mui/material';

import { UseDataTableSucursal } from './hooks/UseDataTableSucursal';

interface ModalCargoProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
export const ModalSucursal = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalCargoProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dataTableSucursal = UseDataTableSucursal({ closeModal, open, titulo, tipo, id, nombreAceptar, nombreCancelar });

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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="nombreSucursal"
                                    label="Nombre Sucursal"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onBlur={dataTableSucursal.handleBlur}
                                    onChange={dataTableSucursal.handleChange}
                                    helperText={dataTableSucursal.errors.nombreSucursal}
                                    error={!!dataTableSucursal.errors.nombreSucursal}
                                    value={dataTableSucursal.values.nombreSucursal}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="direccion"
                                    label="Direccion"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onBlur={dataTableSucursal.handleBlur}
                                    onChange={dataTableSucursal.handleChange}
                                    helperText={dataTableSucursal.errors.direccion}
                                    error={!!dataTableSucursal.errors.direccion}
                                    value={dataTableSucursal.values.direccion}
                                />
                            </Grid>
                        </Grid>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal}>
                        {nombreCancelar}
                    </Button>
                    <Button autoFocus onClick={dataTableSucursal.onSave}>
                        {nombreAceptar}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
