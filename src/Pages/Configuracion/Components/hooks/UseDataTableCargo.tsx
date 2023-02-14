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
import { DeleteCargoService, EditCargoService, StoreCargoService, UpdateCargoService } from '../../../../Service/ApiRRHH/Cargo';

interface cargo {
    nombreCargo: string
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
    nombreCargo: ''
}
export const UseDataTableCargo = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalCargoProps) => {
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
            const { data } = await EditCargoService(id);
            if (data.status == 1) {
                await setValues({ nombreCargo: data.data.nombreCargo });
            }
            else {

            }
        } catch (error) {

        }
    }
    const create = async () => {
        setValues({ nombreCargo: '' });
    }
    const store = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            const { data } = await StoreCargoService(values.nombreCargo);
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
            const { data } = await UpdateCargoService(id, values.nombreCargo);
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
            const { data } = await DeleteCargoService(id);
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
    return {
        onSave,
        eliminar,
        update,
        edit,
        create,
        store,
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors
    }
}
