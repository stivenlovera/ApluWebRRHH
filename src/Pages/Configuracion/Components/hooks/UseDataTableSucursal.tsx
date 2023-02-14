import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { DeleteSucursalService, EditSucursalService, StoreSucursalService, UpdateSucursalService } from '../../../../Service/ApiRRHH/Sucursal';

interface cargo {
    nombreSucursal: string;
    direccion: string;
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
    nombreSucursal: '',
    direccion: ''
}
export const UseDataTableSucursal = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalCargoProps) => {

    const { isValid, values, handleSubmit, handleBlur, handleChange, errors, setValues } = useFormik({
        initialValues: initialState,
        onSubmit: async (value) => {

        },
        validationSchema: Yup.object({
            nombreSucursal: Yup.string().required('Es requerido'),
            direccion: Yup.string().required('Es requerido'),
        })
    });
    //metodos
    const edit = async () => {
        try {
            const { data } = await EditSucursalService(id);
            if (data.status == 1) {
                console.log(data.data)
                await setValues({ nombreSucursal: data.data.nombreSucursal, direccion: data.data.direccion });
            }
            else {

            }
        } catch (error) {

        }
    }
    const create = async () => {
        setValues({ nombreSucursal: '', direccion: '' });
    }
    const store = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            console.log(values)
            const { data } = await StoreSucursalService(values.nombreSucursal, values.direccion);
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
            const { data } = await UpdateSucursalService(id, values.nombreSucursal, values.direccion);
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
            const { data } = await DeleteSucursalService(id);
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
