import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, TextField } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { DeleteUnidadService, EditUnidadService, StoreUnidadService, UpdateUnidadService } from '../../../Service/ApiRRHH/Unidad';
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
export const ModalUnidad = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalCargoProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const data = UseDataTableCargo({ closeModal, open, titulo, tipo, id, nombreAceptar, nombreCancelar });
    const { isValid, values, handleSubmit, handleBlur, handleChange, errors, setValues } = useFormik({
        initialValues: initialState,
        onSubmit: async (value) => {

        },
        validationSchema: Yup.object({
            nombreCargo: Yup.string().required('Es requerido'),
        })
    });
    //metodos
    const edit = async () => {
        try {
            const { data } = await EditUnidadService(id);
            if (data.status == 1) {
                console.log(data.data.nombreUnidad)
                await setValues({ nombreUnidad: data.data.nombreUnidad });
            }
            else {

            }
        } catch (error) {

        }
    }
    const create = async () => {
        setValues({ nombreUnidad: '' });
    }
    const store = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            console.log(values)
            const { data } = await StoreUnidadService(values.nombreUnidad);
            if (data.status == 1) {
                return closeModal(event);
            }
            else {

            }
        } catch (error) {

        }
    }
    const update = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            console.log(values)
            const { data } = await UpdateUnidadService(id, values.nombreUnidad);
            if (data.status == 1) {
                return closeModal(event);
            }
            else {

            }
        } catch (error) {

        }
    }
    const eliminar = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            console.log(values)
            const { data } = await DeleteUnidadService(id);
            if (data.status == 1) {
                return closeModal(event);
            }
            else {

            }
        } catch (error) {

        }
    }
    useEffect(() => {
        switch (tipo) {
            case 'nuevo':
                create();
                console.log('nuevo')
                break;
            case 'editar':
                edit();
                console.log('editar')
                break;
            default:
                break;
        }
        return () => {

        }
    }, [open])

    const onSave = async (event: React.MouseEvent<HTMLElement>) => {
        switch (tipo) {
            case 'nuevo':
                store(event)
                break;
            case 'editar':
                update(event)
                break;
            case 'eliminar':
                eliminar(event)
                break;
            default:
                break;
        }
    }
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
                                    name="nombreUnidad"
                                    label="Nombre de unidad"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    helperText={errors.nombreUnidad}
                                    error={!!errors.nombreUnidad}
                                    value={values.nombreUnidad}
                                />
                            </Grid>
                        </Grid>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal}>
                        {nombreCancelar}
                    </Button>
                    <Button autoFocus onClick={onSave}>
                        {nombreAceptar}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
