
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { UseDataTableContrato } from '../hooks/UseDataTableContrato';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { IModalidadContrato } from '../../../../Service/ApiRRHH/Interfaces/ModalidadContrato';

interface ModalContratoProps {
    closeModal: (event: React.MouseEvent<HTMLElement>) => void
    open: boolean
    tipo: string,
    titulo: string,
    id: number
    nombreAceptar: string;
    nombreCancelar: string
}
export const ModalContrato = ({ closeModal, open, titulo, tipo, id = 0, nombreAceptar, nombreCancelar }: ModalContratoProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const useDataTableContrato = UseDataTableContrato({ closeModal, open, titulo, tipo, id, nombreAceptar, nombreCancelar });
    //descarga de documento
    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `contrato-${useDataTableContrato.values.nombreCompleto}.pdf`;
        link.href = `${process.env.REACT_APP_API_RRHH}/api/contrato/generar-descarga-contrato/${useDataTableContrato.values.id}`;
        link.click();
    };

    const calculoFecha = async (modalidadId: number,fechaInicio:Date|null) => {
        var id = filtrarModalidad(useDataTableContrato.createContratoColaborador.modalidadContrato, modalidadId);
        console.log(useDataTableContrato.createContratoColaborador.modalidadContrato, modalidadId)
        console.log(id.dias);
        console.log(useDataTableContrato.values.fechaInicio)
        let resultado = moment(fechaInicio?.toLocaleString()).add(id.dias, 'days').toDate();
        useDataTableContrato.setFieldValue("fechaFinalizacion", resultado, true);
    }

    function filtrarModalidad(modalidades: IModalidadContrato[], modalidad: number) {
        let resultado: IModalidadContrato = {
            dias: 0,
            id: 0,
            nombreModContrato: ''
        }
        modalidades.map((value) => {
            if (modalidad == value.id) {
                console.log('es igual', modalidad, value.id)
                resultado = value;
                return resultado
            };
        });
        return resultado
    }
    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={closeModal}
                maxWidth='lg'
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {titulo}
                </DialogTitle>
                <DialogContent>
                    {
                        tipo == 'eliminar' ? (<></>) : (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="ci"
                                        label="CI"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTableContrato.handleBlur}
                                        onChange={useDataTableContrato.handleChange}
                                        helperText={useDataTableContrato.errors.ci}
                                        error={!!useDataTableContrato.errors.ci}
                                        value={useDataTableContrato.values.ci}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="codigoColaborador"
                                        label="Codigo Colaborador"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTableContrato.handleBlur}
                                        onChange={useDataTableContrato.handleChange}
                                        helperText={useDataTableContrato.errors.codigoColaborador}
                                        error={!!useDataTableContrato.errors.codigoColaborador}
                                        value={useDataTableContrato.values.codigoColaborador}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="nombreCompleto"
                                        label="Nombre completo"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTableContrato.handleBlur}
                                        onChange={useDataTableContrato.handleChange}
                                        helperText={useDataTableContrato.errors.nombreCompleto}
                                        error={!!useDataTableContrato.errors.nombreCompleto}
                                        value={useDataTableContrato.values.nombreCompleto}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Tipo Contrato</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="tipoContrato"
                                            name="tipoContrato"
                                            value={useDataTableContrato.values.tipoContrato}
                                            onChange={useDataTableContrato.handleChange}
                                            label="Cargo"
                                        >
                                            {
                                                useDataTableContrato.createContratoColaborador.tipoContrato.map((tipoContrato, i) => {
                                                    return (<MenuItem key={i} value={tipoContrato.id}>{tipoContrato.nombreTipoContrato}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '12px' }}>Contrato escrito</InputLabel>
                                    <Button sx={{ mr: 1 }} variant="contained"
                                        onClick={(e) => {
                                            onDownload();
                                        }} >
                                        Descarge contrato actual</Button>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label" >Modalidad Contrato</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="modalidadContrato"
                                            name="modalidadContrato"
                                            value={useDataTableContrato.values.modalidadContrato}
                                            onChange={(e) => {
                                                useDataTableContrato.handleChange(e);
                                                calculoFecha(parseInt(e.target.value),useDataTableContrato.values.fechaInicio);
                                                if (e.target.value == '1') {
                                                    useDataTableContrato.setFieldValue("fechaFinalizacion", null, true);
                                                }
                                            }}
                                            label="Modalidad contrato"
                                        >
                                            {
                                                useDataTableContrato.createContratoColaborador.modalidadContrato.map((modalidad, i) => {
                                                    return (<MenuItem key={i} value={modalidad.id}>{modalidad.nombreModContrato}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="haberbasico"
                                        label="Haber Basico"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTableContrato.handleBlur}
                                        onChange={useDataTableContrato.handleChange}
                                        helperText={useDataTableContrato.errors.haberBasico}
                                        error={!!useDataTableContrato.errors.haberBasico}
                                        value={useDataTableContrato.values.haberBasico}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ fontSize: '12px' }}>Modo Haber Basico</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="modoHaberBasico"
                                            onChange={useDataTableContrato.handleChange}
                                            value={useDataTableContrato.values.modoHaberBasico}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="haberQuincena"
                                        label="Haber quincena"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTableContrato.handleBlur}
                                        onChange={useDataTableContrato.handleChange}
                                        helperText={useDataTableContrato.errors.haberQuincena}
                                        error={!!useDataTableContrato.errors.haberQuincena}
                                        value={useDataTableContrato.values.haberQuincena}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ fontSize: '12px' }}>Modo Quincena</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="modoQuincena"
                                            onChange={useDataTableContrato.handleChange}
                                            value={useDataTableContrato.values.modoQuincena}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        name="motivoContrato"
                                        label="Motivo contratacion"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={useDataTableContrato.handleBlur}
                                        onChange={useDataTableContrato.handleChange}
                                        helperText={useDataTableContrato.errors.motivoContrato}
                                        error={!!useDataTableContrato.errors.motivoContrato}
                                        value={useDataTableContrato.values.motivoContrato}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Inicio"
                                            value={useDataTableContrato.values.fechaInicio}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            onChange={
                                                async (value) => {
                                                    await useDataTableContrato.setFieldValue("fechaInicio", value, true);
                                                    calculoFecha(parseInt(useDataTableContrato.values.modalidadContrato),value);
                                                }
                                            }
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Ratificacion"
                                            value={useDataTableContrato.values.fechaRatificacion}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            onChange={(value) => useDataTableContrato.setFieldValue("fechaRatificacion", value, true)}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Finalizacion"
                                            value={useDataTableContrato.values.fechaFinalizacion}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            onChange={(value) => useDataTableContrato.setFieldValue("fechaFinalizacion", value, true)}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                            readOnly
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal}>
                        {nombreCancelar}
                    </Button>
                    <Button autoFocus onClick={useDataTableContrato.onSave}>
                        {nombreAceptar}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
