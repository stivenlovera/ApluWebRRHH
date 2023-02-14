import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ISucursal } from '../../../../Service/ApiRRHH/Interfaces/SucursalDto';
import { CreateTipoContratoService,StoreTipoContratoService,UpdateTipoContratoService,DeleteTipoContratoService,EditTipoContratoService } from '../../../../Service/ApiRRHH/TipoContrato';
import { ITipoContrato } from '../../../../Service/ApiRRHH/Interfaces/TipoContratoDto';

interface cargo {
    nombreOficina: string;
    hhrrSucursalId: number;
}
interface UseDataTableTipoContratoProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
const initialState: ITipoContrato = {
    id:0,
    nombreTipoContrato:""
}
export const UseDataTableTipoContrato = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: UseDataTableTipoContratoProps) => {
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
            const { data } = await EditTipoContratoService(id);
            if (data.status == 1) {
                console.log(data.data)
                await setValues({ id: data.data.id, nombreTipoContrato: data.data.nombreTipoContrato });
            }
            else {

            }
        } catch (error) {

        }
    }
    const create = async () => {
        try {
            const { data } = await CreateTipoContratoService();
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
            const { data } = await StoreTipoContratoService(values.nombreTipoContrato);
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
            const { data } = await UpdateTipoContratoService(id, values.nombreTipoContrato);
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
            const { data } = await DeleteTipoContratoService(id);
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
