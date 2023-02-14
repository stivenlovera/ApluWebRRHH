import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { IModalidadContrato } from '../../../../Service/ApiRRHH/Interfaces/ModalidadContrato';
import { CreateModalidadService, EditModalidadService, StoreModalidadService, UpdateModalidadService, DeleteModalidadService } from '../../../../Service/ApiRRHH/ModalidadContrato';

interface UseDataTablePlantillaProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
const initialState: IModalidadContrato = {
    id: 0,
    nombreModContrato: "",
    dias: 0
}
export const UseDataTablePlantilla = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: UseDataTablePlantillaProps) => {
    const [sucursal, setSucursal] = useState<IModalidadContrato[]>([])
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
            const { data } = await EditModalidadService(id);
            if (data.status == 1) {
                console.log(data.data)
                await setValues(data.data);
            }
            else {

            }
        } catch (error) {

        }
    }
    const create = async () => {

        try {
            const { data } = await CreateModalidadService();
            if (data.status == 1) {
                console.log(data.data)
                setSucursal(data.data);
            }
            else {

            }
        } catch (error) {

        }
        setValues(initialState);
    }
    const store = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            console.log(values)
            const { data } = await StoreModalidadService(values.nombreModContrato, values.dias);
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
            const { data } = await UpdateModalidadService(id, values.nombreModContrato, values.dias);
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
            const { data } = await DeleteModalidadService(id);
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
