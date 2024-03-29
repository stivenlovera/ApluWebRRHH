import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { DataTypeProvider, SearchState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Toolbar,
    SearchPanel,
    VirtualTable,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';


import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Loading } from '../../Colaboradores/Components/Loading';
import { GetCargoService } from '../../../Service/ApiRRHH/Cargo';
import { ICargo } from '../../../Service/ApiRRHH/Interfaces/CargoDto';
import { GetUnidadService } from '../../../Service/ApiRRHH/Unidad';
import { IUnidad } from '../../../Service/ApiRRHH/Interfaces/UnidadDto';
import { ModalUnidad } from './ModalUnidad';

export const DataTableUnidad = () => {
    const [{ openModal, title, type, id, nombreAceptar, nombreCancelar }, setOpencargo] = useState({
        openModal: false,
        title: "",
        type: "",
        id: 0,
        nombreAceptar: "",
        nombreCancelar: ""
    })
    const [tableColumnExtensions] = useState([
        { columnName: 'nombreUnidad' },
        { columnName: 'acciones', width: 250 },
    ]);
    const [columns] = useState([
        { name: 'nombreUnidad', title: 'UNIDAD' },
        { name: 'id', title: 'ACCIONES' },
    ]);
    const [rows, setRows] = useState<IUnidad[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [lastQuery, setLastQuery] = useState('');

    const getQueryString = () => {
        let filter = columns.reduce((acc: any, { name }) => {
            acc.push(`["${name}", "contains", "${encodeURIComponent(searchValue)}"]`);
            return acc;
        }, []).join(',"or",');

        if (columns.length > 1) {
            filter = `[${filter}]`;
        }

        return `${URL}?filter=${filter}`;
    };

    const loadData = async () => {
        try {
            const { data } = await GetUnidadService();
            setRows(data.data);
            setLoading(false);
            /*  const queryString = getQueryString();
             if (queryString !== lastQuery && !loading) {
                
                 fetch(queryString)
                     .then(response => response.json())
                     .then((orders) => {
                         setRows(orders.data);
                         setLoading(false);
                     })
                     .catch(() => setLoading(false));
                 setLastQuery(queryString);
             } */
        } catch (error) {
            setLoading(false)
        }


    };
    const DateFormatter = ({ value }: any) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');

    const DateTypeProvider = (props: any) => (
        <DataTypeProvider
            formatterComponent={DateFormatter}
            {...props}
        />
    );
    const CurrencyFormatter = ({ value }: any) => {
        return (
            <>
                <Button sx={{ mr: 1 }} variant="contained" onClick={() => { OpenEditUnidad(value) }}>Editar </Button>
                <Button variant="outlined" color="error" onClick={() => OpenDeleteUnidad(value)}>
                    Eliminar
                </Button>
            </>
        )
    };
    const [dateColumns] = useState(['saleDate']);
    const [currencyColumns] = useState(['id']);
    const CurrencyTypeProvider = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );
    function OpenNuevoUnidad() {
        setOpencargo({
            openModal: true,
            title: "Añadir unidad",
            type: "nuevo",
            id: 0,
            nombreCancelar: "Cancelar",
            nombreAceptar: "Guardar"
        })
    }
    function OpenEditUnidad(id: number) {
        setOpencargo({
            openModal: true,
            title: "Editar unidad",
            type: "editar",
            id: id,
            nombreCancelar: "Cancelar",
            nombreAceptar: "Modificar"
        })
    }
    function OpenDeleteUnidad(id: number) {
        setOpencargo({
            openModal: true,
            title: "Esta seguro de realizar esta accion",
            type: "eliminar",
            id: id,
            nombreCancelar: "Cancelar",
            nombreAceptar: "Eliminar"
        })
    }
    function CloseUnidad() {
        loadData()
        setOpencargo({
            openModal: false,
            title: "",
            type: "",
            id: 0,
            nombreCancelar: "",
            nombreAceptar: ""
        })
    }
    useEffect(() => {
        setLoading(true);
        loadData()

        return () => {

        }
    }, [setOpencargo])
    return (
        <>
            <Typography variant='h6' sx={{ mb: 1 }}>Lista Unidad</Typography>
            <Button sx={{ mb: 2 }} variant="contained" onClick={OpenNuevoUnidad} >Registrar unidad</Button>
            <Paper style={{ position: 'relative' }}>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <SearchState
                        onValueChange={setSearchValue}
                    />
                    <CurrencyTypeProvider
                        for={currencyColumns}
                    />
                    <DateTypeProvider
                        for={dateColumns}
                    />
                    <VirtualTable columnExtensions={tableColumnExtensions} />
                    <TableHeaderRow />
                    <Toolbar />
                    <SearchPanel />
                </Grid>
                {loading && <Loading />}
            </Paper>
            <ModalUnidad open={openModal} titulo={title} tipo={type} closeModal={CloseUnidad} id={id} nombreAceptar={nombreAceptar} nombreCancelar={nombreCancelar}></ModalUnidad>
        </>
    )
}

