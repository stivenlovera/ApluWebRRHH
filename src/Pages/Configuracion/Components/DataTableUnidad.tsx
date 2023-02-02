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


import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Loading } from '../../Colaboradores/Components/Loading';
import { GetCargoService } from '../../../Service/ApiRRHH/Cargo';
import { ICargo } from '../../../Service/ApiRRHH/Interfaces/CargoDto';
import { GetUnidadService } from '../../../Service/ApiRRHH/Unidad';
import { IUnidad } from '../../../Service/ApiRRHH/Interfaces/UnidadDto';

export const DataTableUnidad = () => {
    const [tableColumnExtensions] = useState([
        { columnName: 'nombreUnidad' },
        { columnName: 'acciones', width: 250 },
    ]);
    const [columns] = useState([
        { name: 'nombreUnidad', title: 'NOMBRE UNIDAD' },
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
        console.log(value);
        return (
            <>
                <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/colaborador/crear">Editar {value}</Button>
                <Button variant="outlined" color="error">
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

    useEffect(() => {
        setLoading(true);
        loadData()

        return () => {

        }
    }, [])
    return (
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
    )
}

