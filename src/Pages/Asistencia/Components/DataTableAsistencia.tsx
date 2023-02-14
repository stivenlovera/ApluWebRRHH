import { useState, useEffect } from 'react';
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
import { Loading } from '../../Colaboradores/Components/Loading';
import { GetAsistenciaService } from '../../../Service/ApiRRHH/Asistencia';
import { CTipografia } from '../../../Components/Labels/CTipografia';
import { DateTableAsistencia } from '../../../Service/ApiRRHH/Interfaces/AsistenciaDto';
export const DataTableAsistencia = () => {

    const [{ openModal, title, type, id, nombreAceptar, nombreCancelar }, setOpencargo] = useState({
        openModal: false,
        title: "",
        type: "",
        id: 0,
        nombreAceptar: "",
        nombreCancelar: ""
    });
   
    const [tableColumnExtensions] = useState([
        { columnName: 'id', width: 200 },
        { columnName: 'nombreCompleto', width: 250 },
    ]);
    const [columns] = useState([
        { name: 'fechaRegistro', title: 'FECHA' },
        { name: 'codigoColaborador', title: 'C. ASISTENCIA' },
        { name: 'nombreCompleto', title: 'NOMBRE COMPLETO' },
        { name: 'cargo', title: 'CARGO' },
        { name: 'horaEntrada', title: 'HORA ENTRADA' },
        { name: 'horaSalida', title: 'HORA SALIDA' },
        { name: 'nota', title: 'NOTA' },
        { name: 'id', title: 'ACCIONES' },
    ]);
    const [rows, setRows] = useState<DateTableAsistencia[]>([]);
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
            const { data } = await GetAsistenciaService();
            setRows(data.data);
            console.log(data.data)
            setLoading(false);
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
                <Button sx={{ mr: 1 }} variant="contained" onClick={() => { OpenEditCargo(value) }}>Modificar Asistencia</Button>
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

    function OpenNuevoCargo() {
        setOpencargo({
            openModal: true,
            title: "Informacion de contrato",
            type: "nuevo",
            id: 0,
            nombreCancelar: "Cancelar",
            nombreAceptar: "Guardar"
        })
    }
    function OpenEditCargo(id: number) {
        setOpencargo({
            openModal: true,
            title: "Informacion de contrato",
            type: "editar",
            id: id,
            nombreCancelar: "Cancelar",
            nombreAceptar: "Modificar"
        })
    }
    function OpenDeleteCargo(id: number) {
        setOpencargo({
            openModal: true,
            title: "Esta seguro de realizar esta accion",
            type: "eliminar",
            id: id,
            nombreCancelar: "Cancelar",
            nombreAceptar: "Eliminar"
        })
    }
    function CloseCargo() {
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
    }, [])
    return (
        <>
            <CTipografia
                titulo='Lista Asistencia'
                descripcion='Informacion de sobre asistencia diaria sujeto a fecha actual'
            />
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
           {/*  <ModalContrato open={openModal} titulo={title} tipo={type} closeModal={CloseCargo} id={id} nombreAceptar={nombreAceptar} nombreCancelar={nombreCancelar}></ModalContrato> */}
        </>
    )
}