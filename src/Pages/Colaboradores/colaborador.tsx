import { ThemeProvider } from "@emotion/react";

import { Backdrop, Button, Card, CardActions, CardContent, Checkbox, CircularProgress, CssBaseline, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SideBar } from '../../Components/Sidebar/sidebar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { CInput } from "../../Components/Form/CInput";
import { CreateColaboradorService, StoreColaboradorService } from "../../Service/ApiRRHH/ColaboradoresService";
import { AdministracionPesiones } from '../../Service/ApiRRHH/Interfaces/AdministracionPensionesDto';
import { Banco } from '../../Service/ApiRRHH/Interfaces/BancoDto';
import { AxiosResponseProps } from '../../Utils/Axios';
import { CreateColaborador, StoreColaborador } from "../../Service/ApiRRHH/Interfaces/ColaboradorDto";
import { TipoDocumento } from '../../Service/ApiRRHH/Interfaces/TipoDocumentoDto';
import moment from 'moment';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ValidateCI } from "../../Validation/Formik";
import { Pais } from '../../Service/ApiRRHH/Interfaces/PaisDto';
import { Departamento } from '../../Service/ApiRRHH/Interfaces/DepartamentoDto';
import { EstadoCivil } from '../../Service/ApiRRHH/Interfaces/EstadoCivilDto';
import { IUnidad } from '../../Service/ApiRRHH/Interfaces/UnidadDto';
import { ISucursal } from '../../Service/ApiRRHH/Interfaces/SucursalDto';
import { ICargo } from '../../Service/ApiRRHH/Interfaces/CargoDto';
import { ClasificacionLaboral } from '../../Service/ApiRRHH/Interfaces/ClasificacionLaboralDto';
import { ModalidadContrato } from '../../Service/ApiRRHH/Interfaces/ModalidadContrato';
import { CentroCosto } from '../../Service/ApiRRHH/Interfaces/CentroCosto';
import { InformacionContable } from '../../Service/ApiRRHH/Interfaces/InformacionContable';
import { TipoContrato } from '../../Service/ApiRRHH/Interfaces/TipoContratoDto';
import { FormacionPrincipal } from '../../Service/ApiRRHH/Interfaces/FomacionPrincipal';
import { TipoCuenta } from '../../Service/ApiRRHH/Interfaces/TipoCuenta';
import { CajaSalud } from '../../Service/ApiRRHH/Interfaces/CajaSaludDto';
import { FormaPago } from '../../Service/ApiRRHH/Interfaces/FormaPago';
import { Sexo } from '../../Service/ApiRRHH/Interfaces/SexoDto';
import { useNavigate, useParams } from "react-router-dom";

interface ColaboradorProps {
    tipo: string
}
const InitialState: StoreColaborador = {
    ci: "",
    nombre1: "",
    nombre2: "",
    nombre3: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    apellidoCasado: "",
    fechaNacimiento: new Date(),
    vencimientoDocumento: new Date(),
    vencimientoLicConducir: new Date(),
    lugarNacimiento: "",
    licenciaConducir: "",
    telefonoFijo: "",
    Celular: "",
    telefonoFijoTrabajo: "",
    ContactoEmegencia: "",
    TelefonoEmergencia: "",
    vehiculoPropio: "",
    viviendaPropia: "",
    TipoSangre: "",
    FactorSangre: "",
    Dirrecion: "",
    Email: "",
    tipoDocumento: "",
    nacionalidad: "",
    departamento: "",
    estadoCivil: "",
    conyugeNombreCompleto: "",
    conyugeLugarNacimiento: "",
    conyugeFechaNacimiento: new Date(),
    codigoColaborador: "",
    fechaIngreso: new Date(),
    fechaIngresoVacaciones: new Date(),
    fechaIngresoVacacionesAnt: new Date(),
    fechaIngresoBonoAntiguedad: new Date(),
    oficina: "",
    ModohaberBasico: "",
    haberBasico: "",
    ModoQuincena: "",
    HaberQuincena: "",
    telefonoLaboral: "",
    celularLaboral: "",
    dirrecionLaboral: "",
    emailLaboral: "",
    motivoContrato: "",
    fechaFinalizacion: new Date(),
    fechaRatificacion: new Date(),
    excliblePlanilla: "",
    aguinaldoMes1: "",
    aplica2aguinaldo: "",
    aplicaRetroactivos: "",
    aplicaPrima: "",
    enviarBoletaPago: "",
    indemnizacionQuinquenios: "",
    indemnizacion: "",
    porcentajeCentroCosto: "",
    cuentaBancaria: "",
    aplicaAFP: "",
    nroAFP: "",
    jubilado: "",
    aportaAFP: "",
    aplicaCajaSalud: "",
    nroAsegurado: "",
    discapacidad: "",
    requiereApruebeVacaciones: "",
    valorLunes: "",
    valorMartes: "",
    valorMiercoles: "",
    valorJueves: "",
    valorViernes: "",
    valorSabado: "",
    valorDomingo: "",
    codigoAsistencia: "",
    diasporMes: "",
    controlarAsistencia: "",
    bonoExtra: "",
    bonoExtraNocturna: "",
    horasParaHorasExtras: "",
    horasPorDia: "",
    descuentoPorFalta: "",
    descuentoPorAtraso: "",
    dominicales: "",
    trabajaDomingo: "",
    HorasPlanillas: "",
    unidad: "",
    sucursal: "",
    cargo: "",
    clasificacionlaboral: "",
    modalidadContrato: "",
    tipoContrato: "",
    informacionContable: "",
    centroCosto: "",
    formaPago: "",
    tipoCuenta: "",
    banco: "",
    administracionPensiones: "",
    cajaSalud: "",
    formacionPrincial: "",
    sexo: "",
}
const Colaborador = ({ tipo }: ColaboradorProps) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { isValid, values, handleSubmit, handleBlur, handleChange, errors, setFieldValue, setFieldTouched, validateForm, setTouched } = useFormik({
        initialValues: InitialState,
        onSubmit: async (value) => {

        },
        validationSchema: Yup.object({
            ci: ValidateCI(),
            nombre1: Yup.string().required('Es requerido'),
            nombre2: Yup.string().required('Es requerido'),
            nombre3: Yup.string().nullable(),
            apellidoPaterno: Yup.string().required('Es requerido'),
            apellidoMaterno: Yup.string().required('Es requerido'),
            apellidoCasado: Yup.string().nullable(),
            fechaNacimiento: Yup.date().required('Es requerido'),
            vencimientoDocumento: Yup.string().required('Es requerido'),
            vencimientoLicConducir: Yup.string().nullable(),
            lugarNacimiento: Yup.string().required('Es requerido'),
            licenciaConducir: Yup.string().nullable(),
            telefonoFijo: Yup.string().nullable(),
            Celular: Yup.string().nullable(),
            telefonoFijoTrabajo: Yup.string().nullable(),
            ContactoEmegencia: Yup.string().required('Es requerido'),
            TelefonoEmergencia: Yup.string().required('Es requerido'),
            vehiculoPropio: Yup.string().required('Marque una opcion'),
            viviendaPropia: Yup.string().required('Marque una opcion'),
            TipoSangre: Yup.string().required('Es requerido'),
            FactorSangre: Yup.string().required('Es requerido'),
            Dirrecion: Yup.string().required('Es requerido'),
            Email: Yup.string().required('Es requerido').email('Debe ser un email'),
            tipoDocumento: Yup.string().required('Debe selecionar almenos una opcion'),
            nacionalidad: Yup.string().required('Debe selecionar almenos una opcion'),
            departamento: Yup.string().required('Debe selecionar almenos una opcion'),
            estadoCivil: Yup.string().required('Debe selecionar almenos una opcion'),
            conyugeNombreCompleto: Yup.string().nullable(),
            conyugeLugarNacimiento: Yup.string().nullable(),
            conyugeFechaNacimiento: Yup.string().nullable(),
            codigoColaborador: Yup.string().nullable(),
            fechaIngreso: Yup.date().required('Es requerido'),
            fechaIngresoVacaciones: Yup.date().required('Es requerido'),
            fechaIngresoVacacionesAnt: Yup.date().required('Es requerido'),
            fechaIngresoBonoAntiguedad: Yup.date().required('Es requerido'),
            oficina: Yup.string().required('Es requerido'),
            ModohaberBasico: Yup.string().required('Marque una opcion'),
            haberBasico: Yup.string().required('Es requerido'),
            ModoQuincena: Yup.string().required('Marque una opcion'),
            HaberQuincena: Yup.string().required('Es requerido'),
            telefonoLaboral: Yup.string().required('Es requerido'),
            celularLaboral: Yup.string().required('Es requerido'),
            dirrecionLaboral: Yup.string().required('Es requerido'),
            emailLaboral: Yup.string().required('Es requerido'),
            motivoContrato: Yup.string().required('Es requerido'),
            fechaFinalizacion: Yup.date().required('Es requerido'),
            fechaRatificacion: Yup.date().required('Es requerido'),
            excliblePlanilla: Yup.string().required('Marque una opcion'),
            aguinaldoMes1: Yup.string().required('Marque una opcion'),
            aplica2aguinaldo: Yup.string().required('Marque una opcion'),
            aplicaRetroactivos: Yup.string().required('Marque una opcion'),
            aplicaPrima: Yup.string().required('Marque una opcion'),
            enviarBoletaPago: Yup.string().required('Marque una opcion'),
            indemnizacionQuinquenios: Yup.string().required('Marque una opcion'),
            indemnizacion: Yup.string().required('Marque una opcion'),
            porcentajeCentroCosto: Yup.string().required('Es requerido'),
            cuentaBancaria: Yup.string().required('Es requerido'),
            aplicaAFP: Yup.string().required('Marque una opcion'),
            nroAFP: Yup.string().required('Es requerido'),
            jubilado: Yup.string().required('Marque una opcion'),
            aportaAFP: Yup.string().required('Marque una opcion'),
            aplicaCajaSalud: Yup.string().required('Marque una opcion'),
            nroAsegurado: Yup.string().required('Es requerido'),
            discapacidad: Yup.string().required('Marque una opcion'),
            requiereApruebeVacaciones: Yup.string().required('Marque una opcion'),
            valorLunes: Yup.string().required('Es requerido'),
            valorMartes: Yup.string().required('Es requerido'),
            valorMiercoles: Yup.string().required('Es requerido'),
            valorJueves: Yup.string().required('Es requerido'),
            valorViernes: Yup.string().required('Es requerido'),
            valorSabado: Yup.string().required('Es requerido'),
            valorDomingo: Yup.string().required('Es requerido'),
            codigoAsistencia: Yup.string().required('Es requerido'),
            diasporMes: Yup.string().required('Marque una opcion'),
            controlarAsistencia: Yup.string().required('Marque una opcion'),
            bonoExtra: Yup.string().required('Marque una opcion'),
            bonoExtraNocturna: Yup.string().required('Marque una opcion'),
            horasParaHorasExtras: Yup.string().required('Marque una opcion'),
            horasPorDia: Yup.string().required('Marque una opcion'),
            descuentoPorFalta: Yup.string().required('Marque una opcion'),
            descuentoPorAtraso: Yup.string().required('Marque una opcion'),
            dominicales: Yup.string().required('Marque una opcion'),
            trabajaDomingo: Yup.string().required('Marque una opcion'),
            HorasPlanillas: Yup.string().required('Marque una opcion'),
            unidad: Yup.string().required('Debe selecionar almenos una opcion'),
            sucursal: Yup.string().required('Debe selecionar almenos una opcion'),
            cargo: Yup.string().required('Debe selecionar almenos una opcion'),
            clasificacionlaboral: Yup.string().required('Debe selecionar almenos una opcion'),
            modalidadContrato: Yup.string().required('Debe selecionar almenos una opcion'),
            tipoContrato: Yup.string().required('Debe selecionar almenos una opcion'),
            informacionContable: Yup.string().required('Debe selecionar almenos una opcion'),
            centroCosto: Yup.string().required('Debe selecionar almenos una opcion'),
            formaPago: Yup.string().required('Debe selecionar almenos una opcion'),
            tipoCuenta: Yup.string().required('Debe selecionar almenos una opcion'),
            banco: Yup.string().required('Debe selecionar almenos una opcion'),
            administracionPensiones: Yup.string().required('Debe selecionar almenos una opcion'),
            cajaSalud: Yup.string().required('Debe selecionar almenos una opcion'),
            formacionPrincial: Yup.string().required('Debe selecionar almenos una opcion'),
            sexo: Yup.string().required('Debe selecionar almenos una opcion'),
        }),
        validateOnBlur: true,

    });


    const [value, setValue] = useState<Dayjs | null>(null);
    const [open, setloader] = useState(false);

    const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento[]>([]);
    const [pais, setPais] = useState<Pais[]>([]);
    const [departamento, setDepartamento] = useState<Departamento[]>([]);
    const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>([]);
    const [unidad, setUnidad] = useState<IUnidad[]>([]);
    const [sucursal, setSucursal] = useState<ISucursal[]>([]);
    const [cargo, setCargo] = useState<ICargo[]>([]);
    const [clasificacionlaboral, setClasificacionlaboral] = useState<ClasificacionLaboral[]>([]);
    const [modalidadContrato, setModalidadContrato] = useState<ModalidadContrato[]>([]);
    const [informacionContable, setInformacionContable] = useState<InformacionContable[]>([]);
    const [centroCosto, setCentroCosto] = useState<CentroCosto[]>([]);
    const [tipoContrato, setTipoContrato] = useState<TipoContrato[]>([]);
    const [formacionPrincial, setFormacionPrincial] = useState<FormacionPrincipal[]>([]);
    const [tipoCuenta, settipoCuenta] = useState<TipoCuenta[]>([]);
    const [banco, setBanco] = useState<Banco[]>([]);
    const [administracionPensiones, setAdministracionPensiones] = useState<AdministracionPesiones[]>([]);
    const [cajaSalud, setCajaSalud] = useState<CajaSalud[]>([]);
    const [formaPago, setFormaPago] = useState<FormaPago[]>([]);
    const [sexo, setSexo] = useState<Sexo[]>([]);

    const CreateColaborador = async () => {
        try {
            const { data } = await CreateColaboradorService();
            setTipoDocumento(data.data.tipoDocumento)
            setPais(data.data.pais)
            setDepartamento(data.data.departamento)
            setEstadoCivil(data.data.estadoCivil)
            setUnidad(data.data.unidad)
            setSucursal(data.data.sucursal)
            setCargo(data.data.cargo)
            setClasificacionlaboral(data.data.clasificacionlaboral)
            setModalidadContrato(data.data.modalidadContrato)
            setInformacionContable(data.data.informacionContable);
            setCentroCosto(data.data.centroCosto);
            setTipoContrato(data.data.tipoContrato);
            setFormacionPrincial(data.data.formacionPrincial);
            settipoCuenta(data.data.tipoCuenta);
            setBanco(data.data.banco);
            setAdministracionPensiones(data.data.administracionPensiones);
            setCajaSalud(data.data.cajaSalud);
            setFormaPago(data.data.formaPago);
            setSexo(data.data.sexo);
        } catch (error) {
            console.log('error')
        }
    }
    const EditartColaborador = async () => {
        let { id } = useParams();
        console.log('TIPO', tipo, 'PARAMS', id)
        try {
            const { data } = await CreateColaboradorService();
            setTipoDocumento(data.data.tipoDocumento)
            setPais(data.data.pais)
            setDepartamento(data.data.departamento)
            setEstadoCivil(data.data.estadoCivil)
            setUnidad(data.data.unidad)
            setSucursal(data.data.sucursal)
            setCargo(data.data.cargo)
            setClasificacionlaboral(data.data.clasificacionlaboral)
            setModalidadContrato(data.data.modalidadContrato)
            setInformacionContable(data.data.informacionContable);
            setCentroCosto(data.data.centroCosto);
            setTipoContrato(data.data.tipoContrato);
            setFormacionPrincial(data.data.formacionPrincial);
            settipoCuenta(data.data.tipoCuenta);
            setBanco(data.data.banco);
            setAdministracionPensiones(data.data.administracionPensiones);
            setCajaSalud(data.data.cajaSalud);
            setFormaPago(data.data.formaPago);
            setSexo(data.data.sexo);
        } catch (error) {
            console.log('error')
        }
    }
    const StoreColaborador = async () => {
        try {
            const { data } = await StoreColaboradorService(values);
            if (data.status == 1) {
                //navigate('/colaboradores');
            }
        } catch (error) {
            console.log('error')
        }
    }

    const onSave = async () => {
        await validateForm(values);
        console.log(values)
        console.log(isValid, errors)
        if (isValid) {
            //console.log(values)
            StoreColaborador();
        }
    }

    useEffect(() => {
        if (tipo == 'editar') {
            console.log('TIPO', tipo, 'PARAMS', id)
        } else {

        }
        CreateColaborador();
        setloader(false);
        return () => {

        }
    }, [])

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Typography variant="h6" gutterBottom>
                Registra nuevo colaboradores
            </Typography>
            <Card sx={{ minWidth: 275 }}>
                <CardContent >
                    <React.Fragment>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION PERSONAL
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                {/* <Grid item xs={12} sm={4}>
                                    <CInput name="" type="" value="" label="" mesage="" />
                                </Grid> */}
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="ci"
                                        label="CI"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.ci}
                                        error={!!errors.ci}
                                        value={values.ci}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Expedido En</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="departamento"
                                            name="departamento"
                                            value={values.departamento}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={!!errors.departamento}
                                            label="Expedido"
                                        >
                                            {
                                                departamento.map((departamento, i) => {
                                                    return (<MenuItem key={i} value={departamento.id}>{departamento.nombreDepartamento}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                        <FormHelperText error={!!errors.departamento}>{errors.departamento}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Tipo de Documento</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="tipoDocumento"
                                            name="tipoDocumento"
                                            value={values.tipoDocumento}
                                            onChange={handleChange}
                                            label="Tipo Documento"
                                        >
                                            {
                                                tipoDocumento.map((documento, i) => {
                                                    return (<MenuItem key={i} value={documento.id}>{documento.tipoDocumento}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                        <FormHelperText error={!!errors.tipoDocumento}>{errors.tipoDocumento}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Venc. Documento"
                                            value={values.vencimientoDocumento}
                                            onChange={(value) => setFieldValue("vencimientoDocumento", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Nacionalidad</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="nacionalidad"
                                            name="nacionalidad"
                                            value={values.nacionalidad}
                                            onChange={handleChange}
                                            label="Nacionalidad"
                                        >
                                            {
                                                pais.map((pais, i) => {
                                                    return (<MenuItem key={i} value={pais.id}>{pais.nombrePais}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                        <FormHelperText error={!!errors.nacionalidad}>{errors.nacionalidad}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="nombre1"
                                        name="nombre1"
                                        label="1er. Nombre"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.nombre1}
                                        error={!!errors.nombre1}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="nombre2"
                                        name="nombre2"
                                        label="2do. Nombre"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.nombre2}
                                        error={!!errors.nombre2}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="nombre3"
                                        name="nombre3"
                                        label="3do. Nombre"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.nombre3}
                                        error={!!errors.nombre3}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="apellidoMaterno"
                                        name="apellidoMaterno"
                                        label="Apellido Materno"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.apellidoMaterno}
                                        error={!!errors.apellidoMaterno}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="apellidoPaterno"
                                        name="apellidoPaterno"
                                        label="Apellido Paterno"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.apellidoPaterno}
                                        error={!!errors.apellidoPaterno}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="apellidoCasado"
                                        name="apellidoCasado"
                                        label="Apellido Casado/a"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.apellidoCasado}
                                        error={!!errors.apellidoCasado}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker

                                            label="Fecha Nacimiento"
                                            value={values.fechaNacimiento}
                                            onChange={(value) => {
                                                setFieldValue("fechaNacimiento", value, true);
                                                setFieldTouched("fechaNacimiento", true, true);

                                            }}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"

                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                    <FormHelperText error={!!errors.fechaNacimiento}>{errors.fechaNacimiento == undefined ? '' : 'Error'}</FormHelperText>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="lugarNacimiento"
                                        name="lugarNacimiento"
                                        label="Lugar de nacimiento"
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.lugarNacimiento}
                                        error={!!errors.lugarNacimiento}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Genero</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="sexo"
                                            name="sexo"
                                            value={values.sexo}
                                            onChange={handleChange}
                                            label="Genero"
                                        >
                                            {
                                                sexo.map((sexo, i) => {
                                                    return (<MenuItem key={i} value={sexo.id}>{sexo.nombreSexo} </MenuItem>)
                                                })
                                            }
                                        </Select>
                                        <FormHelperText sx={{ mt: 0 }} error={!!errors.sexo}>{errors.sexo}</FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Estado Civil</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="estadoCivil"
                                            name="estadoCivil"
                                            value={values.estadoCivil}
                                            onChange={handleChange}
                                            label="Estado Civil"
                                        >
                                            {
                                                estadoCivil.map((estadoCivil, i) => {
                                                    return (<MenuItem key={i} value={estadoCivil.id}>{estadoCivil.nombreEstadoCivil}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="licenciaConducir"
                                        name="licenciaConducir"
                                        label="Licencia Conducir"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.licenciaConducir}
                                        error={!!errors.apellidoCasado}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Venc. Licencia Conducir"
                                            value={values.vencimientoLicConducir}
                                            onChange={(value) => setFieldValue("vencimientoLicConducir", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="telefonoFijo"
                                        name="telefonoFijo"
                                        label="Telefono Fijo"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.telefonoFijo}
                                        error={!!errors.telefonoFijo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="celular"
                                        name="celular"
                                        label="Celular"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.Celular}
                                        error={!!errors.Celular}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="telefonoFijoTrabajo"
                                        name="telefonoFijoTrabajo"
                                        label="Telefono Trabajo"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.telefonoFijoTrabajo}
                                        error={!!errors.telefonoFijoTrabajo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="ContactoEmegencia"
                                        name="ContactoEmegencia"
                                        label="Contacto Emergencia"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.ContactoEmegencia}
                                        error={!!errors.ContactoEmegencia}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="TelefonoEmergencia"
                                        name="TelefonoEmergencia"
                                        label="Telefono Emergencia"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.TelefonoEmergencia}
                                        error={!!errors.TelefonoEmergencia}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Vivienda Propia</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="viviendaPropia"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Vehiculo Propio</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="vehiculoPropio"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="TipoSangre"
                                        name="TipoSangre"
                                        label="Tipo Sangre"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.TipoSangre}
                                        error={!!errors.TipoSangre}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="FactorSangre"
                                        name="FactorSangre"
                                        label="Factor Sangre"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.FactorSangre}
                                        error={!!errors.FactorSangre}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="Dirrecion"
                                        name="Dirrecion"
                                        label="Direccion"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.Dirrecion}
                                        error={!!errors.Dirrecion}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="Email"
                                        name="Email"
                                        label="Email"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.Email}
                                        error={!!errors.Email}
                                    />
                                </Grid>
                                {/*   <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                    label="Use this address for payment details"
                                />
                            </Grid> */}
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                CONYUGE
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="conyugeNombreCompleto"
                                        name="conyugeNombreCompleto"
                                        label="Nombre Completo"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.conyugeNombreCompleto}
                                        error={!!errors.conyugeNombreCompleto}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="conyugeLugarNacimiento"
                                        name="conyugeLugarNacimiento"
                                        label="Conyuge Lugar Nacimiento"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.conyugeLugarNacimiento}
                                        error={!!errors.conyugeLugarNacimiento}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Nacimiento Conyuge"
                                            value={values.conyugeFechaNacimiento}
                                            onChange={(value) => setFieldValue("conyugeFechaNacimiento", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION LABORAL
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="codigoColaborador"
                                        name="codigoColaborador"
                                        label="Codigo Colaborador"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.codigoColaborador}
                                        error={!!errors.codigoColaborador}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Ingreso"
                                            value={values.fechaIngreso}
                                            onChange={(value) => setFieldValue("fechaIngreso", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Ingreso Vacaciones"
                                            value={values.fechaIngresoVacaciones}
                                            onChange={(value) => setFieldValue("fechaIngresoVacaciones", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Ingreso Antiguedad Vacaciones"
                                            value={values.fechaIngresoVacacionesAnt}
                                            onChange={(value) => setFieldValue("fechaIngresoVacacionesAnt", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Ingreso Bono Antiguedad"
                                            value={values.fechaIngresoBonoAntiguedad}
                                            onChange={(value) => setFieldValue("fechaIngresoBonoAntiguedad", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Unidad Nivel</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="unidad"
                                            name="unidad"
                                            value={values.unidad}
                                            onChange={handleChange}
                                            label="Unidad"
                                        >
                                            {
                                                unidad.map((unidad, i) => {
                                                    return (<MenuItem key={i} value={unidad.id}>{unidad.nombreUnidad}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Sucursal</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="sucursal"
                                            name="sucursal"
                                            value={values.sucursal}
                                            onChange={handleChange}
                                            label="Tipo Documento"
                                        >
                                            {
                                                sucursal.map((sucursal, i) => {
                                                    return (<MenuItem key={i} value={sucursal.id}>{sucursal.nombreSucursal}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="oficina"
                                        name="oficina"
                                        label="Oficina"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.oficina}
                                        error={!!errors.oficina}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Cargo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="cargo"
                                            name="cargo"
                                            value={values.cargo}
                                            onChange={handleChange}
                                            label="Cargo"
                                        >
                                            {
                                                cargo.map((cargo, i) => {
                                                    return (<MenuItem key={i} value={cargo.id}>{cargo.nombreCargo}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Modo Haber basico</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="ModohaberBasico"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Monto mensual" />
                                            <FormControlLabel value="2" control={<Radio />} label="Monto quincenal" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="haberBasico"
                                        name="haberBasico"
                                        label="Haber Basico"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.haberBasico}
                                        error={!!errors.haberBasico}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Modo Quincena</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="ModoQuincena"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="porcentaje" />
                                            <FormControlLabel value="2" control={<Radio />} label="Monto" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="HaberQuincena"
                                        name="HaberQuincena"
                                        label="Haber quincena"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.HaberQuincena}
                                        error={!!errors.HaberQuincena}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="telefonoLaboral"
                                        name="telefonoLaboral"
                                        label="Telefono"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.telefonoLaboral}
                                        error={!!errors.telefonoLaboral}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="celularLaboral"
                                        name="celularLaboral"
                                        label="Celular"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.celularLaboral}
                                        error={!!errors.celularLaboral}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="dirrecionLaboral"
                                        name="dirrecionLaboral"
                                        label="Direccion"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.dirrecionLaboral}
                                        error={!!errors.dirrecionLaboral}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="emailLaboral"
                                        name="emailLaboral"
                                        label="Email"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.emailLaboral}
                                        error={!!errors.emailLaboral}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Clasificacion Laboral</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="clasificacionlaboral"
                                            name="clasificacionlaboral"
                                            value={values.clasificacionlaboral}
                                            onChange={handleChange}
                                            label="Cargo"
                                        >
                                            {
                                                clasificacionlaboral.map((clasificacionlaboral, i) => {
                                                    return (<MenuItem key={i} value={clasificacionlaboral.id}>{clasificacionlaboral.nombreClasificacionLaboral}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Modalidad de contrato</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="ModalidadContrato"
                                            name="modalidadContrato"
                                            value={values.modalidadContrato}
                                            onChange={handleChange}
                                            label="Cargo"
                                        >
                                            {
                                                modalidadContrato.map((modalidadContrato, i) => {
                                                    return (<MenuItem key={i} value={modalidadContrato.id}>{modalidadContrato.nombreModContrato}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Tipo Contrato</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="tipoContrato"
                                            name="tipoContrato"
                                            value={values.tipoContrato}
                                            onChange={handleChange}
                                            label="Cargo"
                                        >
                                            {
                                                tipoContrato.map((tipoContrato, i) => {
                                                    return (<MenuItem key={i} value={tipoContrato.id}>{tipoContrato.nombreTipoContrato}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="motivoContrato"
                                        name="motivoContrato"
                                        label="Motivo de Contratacion"
                                        fullWidth
                                        autoComplete="shipping country"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.motivoContrato}
                                        error={!!errors.motivoContrato}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Finalizacion"
                                            value={values.fechaFinalizacion}
                                            onChange={(value) => setFieldValue("fechaFinalizacion", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Ratificacion"
                                            value={values.fechaRatificacion}
                                            onChange={(value) => setFieldValue("fechaRatificacion", value, true)}
                                            toolbarFormat="DD/MM/YYYY"
                                            inputFormat="DD/MM/YYYY"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Excluible Plantilla</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="excliblePlanilla"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Aguinaldo/Prima desde el 1er Mes</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="aguinaldoMes1"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Aplica 2do aguinaldo</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="aplica2aguinaldo"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Aplica retroactivos</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="aplicaRetroactivos"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Aplica prima</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="aplicaPrima"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Enviar Boleta de pago por Email</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="enviarBoletaPago"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Forma de calculo indemnizacion para quinquenios</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="indemnizacionQuinquenios"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Desde ultimo quinquenio" />
                                            <FormControlLabel value="2" control={<Radio />} label="Desde ultimo pago a cuenta de indemnizacion" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Forma de calculo para indemnizacion  para retiros</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="indemnizacion"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Desde ultimo quinquenio" />
                                            <FormControlLabel value="2" control={<Radio />} label="Desde ultimo pago a cuenta de indemnizacion" />
                                            <FormControlLabel value="3" control={<Radio />} label="Desde Fecha de ingreso" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION CONTABLE
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Informacion contable</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="informacionContable"
                                            name="informacionContable"
                                            value={values.informacionContable}
                                            onChange={handleChange}
                                            label="Cargo"
                                        >
                                            {
                                                informacionContable.map((informacionContable, i) => {
                                                    return (<MenuItem key={i} value={informacionContable.id}>{informacionContable.nombreInformacionContable}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                CENTRO DE COSTO
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="porcentajeCentroCosto"
                                        name="porcentajeCentroCosto"
                                        label="Porcentaje CentroCosto"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.porcentajeCentroCosto}
                                        error={!!errors.porcentajeCentroCosto}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Añadir centro de costo</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="centroCosto"
                                            name="centroCosto"
                                            value={values.centroCosto}
                                            onChange={handleChange}
                                            label="Cargo"
                                        >
                                            {
                                                centroCosto.map((centroCosto, i) => {
                                                    return (<MenuItem key={i} value={centroCosto.id}>{centroCosto.nombreCentroCosto}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION DE PAGO
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Forma de pago</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="formaPago"
                                            name="formaPago"
                                            value={values.formaPago}
                                            onChange={handleChange}
                                            label="Foma de pago"
                                        >
                                            {
                                                formaPago.map((formaPago, i) => {
                                                    return (<MenuItem key={i} value={formaPago.id}>{formaPago.nombreFormaPago}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Tipo de cuenta</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="tipoCuenta"
                                            name="tipoCuenta"
                                            value={values.tipoCuenta}
                                            onChange={handleChange}
                                            label="Tipo Cuenta"
                                        >
                                            {
                                                tipoCuenta.map((tipoCuenta, i) => {
                                                    return (<MenuItem key={i} value={tipoCuenta.id}>{tipoCuenta.nombreTipoCuenta}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="cuentaBancaria"
                                        name="cuentaBancaria"
                                        label="Cuenta Bancaria"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.cuentaBancaria}
                                        error={!!errors.cuentaBancaria}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Banco</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="banco"
                                            name="banco"
                                            value={values.banco}
                                            onChange={handleChange}
                                            label="Banco"
                                        >
                                            {
                                                banco.map((banco, i) => {
                                                    return (<MenuItem key={i} value={banco.id}>{banco.nombreBanco}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION DE AFP
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Aplica AFP</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="aplicaAFP"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="nroAFP"
                                        name="nroAFP"
                                        label="Nro Afp"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.nroAFP}
                                        error={!!errors.nroAFP}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Administracion de pensiones</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="administracionPensiones"
                                            name="administracionPensiones"
                                            value={values.administracionPensiones}
                                            onChange={handleChange}
                                            label="Foma de pago"
                                        >
                                            {
                                                administracionPensiones.map((administracionPensiones, i) => {
                                                    return (<MenuItem key={i} value={administracionPensiones.id}>{administracionPensiones.nombreAdministracionPesion}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Esta jubilado?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="jubilado"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Aporta a la AFP?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="aportaAFP"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION DE CAJA DE SALUD
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Aplica caja de salud</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="aplicaCajaSalud"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Caja de salud</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="cajaSalud"
                                            name="cajaSalud"
                                            value={values.cajaSalud}
                                            onChange={handleChange}
                                            label="Caja de salud"
                                        >
                                            {
                                                cajaSalud.map((cajaSalud, i) => {
                                                    return (<MenuItem key={i} value={cajaSalud.id}>{cajaSalud.nombreCajaSalud}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="nroAsegurado"
                                        name="nroAsegurado"
                                        label="Nro Asegurado"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.nroAsegurado}
                                        error={!!errors.nroAsegurado}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION DE DISCAPACIDADES
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Persona con discapacidad</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="discapacidad"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                PARAMETROS DE VACACIONES
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Requiere aprobacion de vacaciones</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="requiereApruebeVacaciones"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                VALOR DE VACACIONES POR DIA
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        id="valorLunes"
                                        name="valorLunes"
                                        label="Lunes valor"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.valorLunes}
                                        error={!!errors.valorLunes}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        id="valorMartes"
                                        name="valorMartes"
                                        label="Martes valor"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.valorMartes}
                                        error={!!errors.valorMartes}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        id="valorMiercoles"
                                        name="valorMiercoles"
                                        label="Miercoles valor"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.valorMiercoles}
                                        error={!!errors.valorMiercoles}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        id="valorJueves"
                                        name="valorJueves"
                                        label="Jueves valor"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.valorJueves}
                                        error={!!errors.valorJueves}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        id="valorViernes"
                                        name="valorViernes"
                                        label="Viernes valor"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.valorViernes}
                                        error={!!errors.valorViernes}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        id="valorSabado"
                                        name="valorSabado"
                                        label="Sabado valor"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.valorSabado}
                                        error={!!errors.valorSabado}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        required
                                        id="valorDomingo"
                                        name="valorDomingo"
                                        label="Domingo valor"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.valorDomingo}
                                        error={!!errors.valorDomingo}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                PARAMETROS DE ASISTENCIA
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="codigoAsistencia"
                                        name="codigoAsistencia"
                                        label="Codigo asistencia"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.codigoAsistencia}
                                        error={!!errors.codigoAsistencia}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Dias por Mes</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="diasporMes"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="30" />
                                            <FormControlLabel value="2" control={<Radio />} label="26" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">¿Controlar asistencia?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="controlarAsistencia"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">¿Aplicar bono horas extras?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="bonoExtra"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">¿Aplicar horas extras nocturnas?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="bonoExtraNocturna"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="horasParaHorasExtras"
                                        name="horasParaHorasExtras"
                                        label="Horas de trabajo para horas extras"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.horasParaHorasExtras}
                                        error={!!errors.horasParaHorasExtras}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="horasPorDia"
                                        name="horasPorDia"
                                        label="Horas de trabajo por dia"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.horasPorDia}
                                        error={!!errors.horasPorDia}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">¿Aplicar descuento por falta?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="descuentoPorFalta"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">¿Aplicar descuento por atraso?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="descuentoPorAtraso"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">¿Recibe dominicales?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="dominicales"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <FormLabel id="demo-row-radio-buttons-group-label">¿Recibe domingo de trabajo?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="trabajaDomingo"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Si" />
                                            <FormControlLabel value="2" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="HorasPlanillas"
                                        name="HorasPlanillas"
                                        label="Horas de trabajo pora planilla"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        helperText={errors.HorasPlanillas}
                                        error={!!errors.HorasPlanillas}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                FORMACION PRINCIPAL
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Formacion principal</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="formacionPrincial"
                                            name="formacionPrincial"
                                            value={values.formacionPrincial}
                                            onChange={handleChange}
                                            label="Foma de pago"
                                        >
                                            {
                                                formacionPrincial.map((formacionPrincial, i) => {
                                                    return (<MenuItem key={i} value={formacionPrincial.id}>{formacionPrincial.nombreFormacionPrincipal}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="institucion"
                                        name="institucion"
                                        label="Institucion"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="titulo"
                                        name="titulo"
                                        label="Titulo"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="lugar"
                                        name="lugar"
                                        label="Lugar"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Inicio"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Fin"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                FORMACION COMPLEMENTARIA
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="curso"
                                        name="curso"
                                        label="curso"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="tituloCurso"
                                        name="tituloCurso"
                                        label="tituloCurso"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Inicio"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Fin"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                INFORMACION DE HIJOS
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="nombreHijo"
                                        name="nombreHijo"
                                        label="Nombre"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="InstEducativa"
                                        name="InstEducativa"
                                        label="Institucion educativa"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Nacimiento"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Genero</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="adminPensiones"
                                            value={values.sexo}
                                            onChange={handleChange}
                                            label="Genero"
                                        >
                                            {
                                                sexo.map((sexo, i) => {
                                                    return (<MenuItem key={i} value={sexo.id}>{sexo.nombreSexo} </MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                REFERENCIAS
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="referenciaNombre"
                                        name="referenciaNombre"
                                        label="Nombre"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="referenciaRelacion"
                                        name="referenciaRelacion"
                                        label="Relacion"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="referenciaTelefono"
                                        name="referenciaTelefono"
                                        label="Telefono"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="referenciaOcupacion"
                                        name="referenciaOcupacion"
                                        label="Ocupacion"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                DECLARACION DE HEREDEROS
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="herederoNombre"
                                        name="herederoNombre"
                                        label="Nombre"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Nacimiento"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="herederoRelacion"
                                        name="herederoRelacion"
                                        label="Relacion"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Genero</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="adminPensiones"
                                            value={values.sexo}
                                            onChange={handleChange}
                                            label="Genero"
                                        >
                                            {
                                                sexo.map((sexo, i) => {
                                                    return (<MenuItem key={i} value={sexo.id}>{sexo.nombreSexo} </MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="herederoDocumento"
                                        name="herederoDocumento"
                                        label="Documento"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Tipo documento</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="adminPensiones"
                                            value={values.tipoDocumento}
                                            onChange={handleChange}
                                            label="Genero"
                                        >
                                            {
                                                sexo.map((sexo, i) => {
                                                    return (<MenuItem key={i} value={sexo.id}>{sexo.nombreSexo} </MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="herederoProcentaje"
                                        name="herederoProcentaje"
                                        label="Porcentaje"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                TRABAJO ANTERIORES
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="trabajoAntEmpresa"
                                        name="trabajoAntEmpresa"
                                        label="Empresa"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="trabajoAntCargo"
                                        name="trabajoAntCargo"
                                        label="Cargo"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Incio"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            label="Fecha Fin"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="trabajoAntResponsabilidades"
                                        name="trabajoAntResponsabilidades"
                                        label="Responsabilidades"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="trabajoAntRetiro"
                                        name="trabajoAntRetiro"
                                        label="Retiro"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#898585' }}>
                                HISTORICO DE CARGOS
                            </Typography>
                            <hr style={{ height: 6, background: '#898585' }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="historicoPeriodo"
                                        name="historicoPeriodo"
                                        label="Periodo"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        required
                                        id="historicoCargo"
                                        name="historicoCargo"
                                        label="Cargo"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </React.Fragment>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={onSave}>registrar</Button>
                </CardActions>
            </Card>
        </>
    );
}

export default Colaborador;
