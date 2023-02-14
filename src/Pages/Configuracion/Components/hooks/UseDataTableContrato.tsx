import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { IModalidadContrato } from '../../../../Service/ApiRRHH/Interfaces/ModalidadContrato';

import { CreateContratoColaborador, EditContratoColaborador, UpdateContratoColaborador } from '../../../../Service/ApiRRHH/ContratoColaborador';
import { IContratoColaborador, ICreateContratoColaborador, } from '../../../../Service/ApiRRHH/Interfaces/ContratoColaborador';

interface UseDataTablePlantillaProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
const initialState: IContratoColaborador = {
    id: 0,
    ci: '',
    nombreCompleto: '',
    codigoColaborador: '',
    modalidadContrato: '',
    clasificacionLaboral: '',
    haberBasico: '',
    modoHaberBasico: '',
    modoQuincena: '',
    tipoContrato: '',
    motivoContrato: '',
    fechaInicio: new Date(),
    fechaFinalizacion: new Date(),
    fechaRatificacion: new Date(),
    haberQuincena: '',
    aplicaAguinaldo: '',
    aplicaSegundoAguinaldo: ''
}
export const UseDataTableContrato = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: UseDataTablePlantillaProps) => {
    const [sucursal, setSucursal] = useState<IModalidadContrato[]>([]);
    const [createContratoColaborador, setCreateContratoColaborador] = useState<ICreateContratoColaborador>({
        clasificacionlaboral: [],
        modalidadContrato: [],
        tipoContrato: []
    });
    const { isValid, values, handleSubmit, handleBlur, handleChange, errors, setValues, setFieldValue } = useFormik({
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
            const { data } = await CreateContratoColaborador();
            if (data.status == 1) {
                console.log('create ', data.data)
                setCreateContratoColaborador(data.data);
            }
            else {

            }
        } catch (error) {

        }
        try {
            const { data } = await EditContratoColaborador(id);
            if (data.status == 1) {
                console.log('editar ', data.data)
                await setValues(data.data);
            }
            else {

            }
        } catch (error) {

        }
    }
    /* const create = async () => {

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
    } */
    /*    const store = async (event: React.MouseEvent<HTMLElement>) => {
           try {
               console.log(values)
               const { data } = await StoreModalidadService(values.nombreModContrato);
               if (data.status == 1) {
                   return closeModal(event);
               }
               else {
   
               }
           } catch (error) {
   
           }
       } */
    const update = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            console.log(values)
            const { data } = await UpdateContratoColaborador(id, values);
            if (data.status == 1) {
                return closeModal(event);
            }
            else {

            }
        } catch (error) {

        }
    }
    /*    const eliminar = async (event: React.MouseEvent<HTMLElement>) => {
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
       } */
    useEffect(() => {
        switch (tipo) {
            case 'nuevo':
                //create();
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
                //store(event)
                break;
            case 'editar':
                update(event)
                break;
            case 'eliminar':
                //eliminar(event)
                break;
            default:
                break;
        }
    }
    return {
        onSave,
        //eliminar,
        update,
        edit,
        //create,
        //store,
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        sucursal,
        createContratoColaborador,
        setFieldValue
    }
}
