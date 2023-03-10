
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, TextField } from '@mui/material';

import { UseDataTableCargo } from './hooks/UseDataTableCargo';

interface cargo {
    nombreUnidad: string
}
interface ModalCargoProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
const initialState: cargo = {
    nombreUnidad: ''
}
export const ModalCargo = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalCargoProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dataTableCargo = UseDataTableCargo({ closeModal, open, titulo, tipo, id, nombreAceptar, nombreCancelar });

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
                                    name="nombreCargo"
                                    label="Nombre del cargo"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onBlur={dataTableCargo.handleBlur}
                                    onChange={dataTableCargo.handleChange}
                                    helperText={dataTableCargo.errors.nombreCargo}
                                    error={!!dataTableCargo.errors.nombreCargo}
                                    value={dataTableCargo.values.nombreCargo}
                                />
                            </Grid>
                        </Grid>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal}>
                        {nombreCancelar}
                    </Button>
                    <Button autoFocus onClick={dataTableCargo.onSave}>
                        {nombreAceptar}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
