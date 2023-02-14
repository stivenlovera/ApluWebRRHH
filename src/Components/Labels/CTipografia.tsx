import { Typography } from '@mui/material'
import React from 'react'
interface CTipografiaProps {
    titulo: string;
    descripcion: string;
}
export const CTipografia = ({ descripcion, titulo }: CTipografiaProps) => {

    return (
        <>
            <Typography variant='body2' style={{ fontWeight: 'bold' }} sx={{ mb: 1 }}>{titulo.toUpperCase()}</Typography>
            <Typography variant='body2' sx={{ mb: 1 }}>
                {descripcion}
            </Typography>
        </>
    )
}
