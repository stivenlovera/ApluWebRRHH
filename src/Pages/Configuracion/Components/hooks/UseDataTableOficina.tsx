import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { CreateOficinaService, DeleteOficinaService, EditOficinaService, StoreOficinaService, UpdateOficinaService } from '../../../../Service/ApiRRHH/Oficina';
import { ISucursal } from '../../../../Service/ApiRRHH/Interfaces/SucursalDto';

interface cargo {
    nombreOficina: string;
    hhrrSucursalId: number;
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
    nombreOficina: '',
    hhrrSucursalId: 0
}
export const UseDataTableOficina = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalCargoProps) => {
    const [sucursal, setSucursal] = useState<ISucursal[]>([])
    const { isValid, values, handleSubmit, handleBlur, handleChange, errors, setValues } = useFormik({
        initialValues: initialState,
        onSubmit: async (value) => {

        },
        validationSchema: Yup.object({
            nombreOficina: Yup.string().required('Es requerido'),
            hhrrSucursalId: Yup.string().required('Es requerido'),
        })
    });
    //metodos
    const edit = async () => {
        try {
            const { data } = await EditOficinaService(id);
            if (data.status == 1) {
                console.log(data.data)
                await setValues({ nombreOficina: data.data.nombreOficina, hhrrSucursalId: data.data.hhrrSucursalId });
            }
            else {

            }
        } catch (error) {

        }
    }
    const create = async () => {
        try {
            const { data } = await CreateOficinaService();
            if (data.status == 1) {
                console.log(data.data)
                setSucursal(data.data);
            }
            else {

            }
        } catch (error) {

        }
        setValues({ nombreOficina: '', hhrrSucursalId: 0 });
    }
    const store = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            console.log(values)
            const { data } = await StoreOficinaService(values.nombreOficina, values.hhrrSucursalId);
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
            const { data } = await UpdateOficinaService(id, values.nombreOficina, values.hhrrSucursalId);
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
            const { data } = await DeleteOficinaService(id);
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
        errors,
        sucursal
    }
}
