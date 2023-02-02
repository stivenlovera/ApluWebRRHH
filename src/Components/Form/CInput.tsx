import { TextField } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { ValidateCI } from '../../Validation/Formik';
interface CInputProp {
    value: string;
    name: string;
    type: string;
    label: string;
    mesage: string;
}
export const CInput = ({ name, type, value, label, mesage }: CInputProp) => {
    const [valor, setValor] = useState({
        name,
        type,
        value,
        label,
        mesage

    });
    const { values, handleSubmit, handleBlur, handleChange, handleReset, errors, getFieldProps, setErrors } = useFormik({
        initialValues: { value: valor.value },
        onSubmit: async (value) => {

        },
        validationSchema: Yup.object({
            value: ValidateCI()
        }),
    });
    const onchange = (value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        //console.log(value.target.value)
    }
    return (
        <TextField
            required
            id="value"
            name={name}
            label={label}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.value}
            error={!!errors.value}
            value={values.value}
        />
    )
}
