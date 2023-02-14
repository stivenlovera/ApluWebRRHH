
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { UseDataTableOficina } from './hooks/UseDataTableOficina';

interface ModalOficinaProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
export const ModalOficina = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalOficinaProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dataTableOficina = UseDataTableOficina({ closeModal, open, titulo, tipo, id, nombreAceptar, nombreCancelar });

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
                                    name="nombreOficina"
                                    label="Nombre Oficina"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onBlur={dataTableOficina.handleBlur}
                                    onChange={dataTableOficina.handleChange}
                                    helperText={dataTableOficina.errors.nombreOficina}
                                    error={!!dataTableOficina.errors.nombreOficina}
                                    value={dataTableOficina.values.nombreOficina}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">Genero</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="hhrrSucursalId"
                                        name="hhrrSucursalId"
                                        value={dataTableOficina.values.hhrrSucursalId}
                                        onChange={dataTableOficina.handleChange}
                                        label="Sucursal"
                                    >
                                        {
                                            dataTableOficina.sucursal.map((sucursal, i) => {
                                                return (<MenuItem key={i} value={sucursal.id}>{sucursal.nombreSucursal} </MenuItem>)
                                            })
                                        }
                                    </Select>
                                    <FormHelperText sx={{ mt: 0 }} error={!!dataTableOficina.errors.hhrrSucursalId}>{dataTableOficina.errors.hhrrSucursalId}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal}>
                        {nombreCancelar}
                    </Button>
                    <Button autoFocus onClick={dataTableOficina.onSave}>
                        {nombreAceptar}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
