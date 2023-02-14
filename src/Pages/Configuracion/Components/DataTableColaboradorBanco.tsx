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
import { GetSucursalService } from '../../../Service/ApiRRHH/Sucursal';
import { ISucursal } from '../../../Service/ApiRRHH/Interfaces/SucursalDto';
import { ModalSucursal } from './ModalSucursal';
export const DataTableColaboradorBanco = () => {

  const [{ openModal, title, type, id, nombreAceptar, nombreCancelar }, setOpencargo] = useState({
    openModal: false,
    title: "",
    type: "",
    id: 0,
    nombreAceptar: "",
    nombreCancelar: ""
  });

  const [tableColumnExtensions] = useState([
    { columnName: 'nombreSucursal' },
    { columnName: 'direccion' },
    { columnName: 'id', width: 250 },
  ]);
  const [columns] = useState([
    { name: 'nombreSucursal', title: 'SUCURSAL' },
    { name: 'direccion', title: 'DIRRECCION' },
    { name: 'id', title: 'ACCIONES' },
  ]);
  const [rows, setRows] = useState<ISucursal[]>([]);
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
      const { data } = await GetSucursalService();
      setRows(data.data);
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
        <Button sx={{ mr: 1 }} variant="contained" onClick={() => { OpenEditCargo(value) }}>Editar</Button>
        <Button variant="outlined" color="error" onClick={() => OpenDeleteCargo(value)}>
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

  function OpenNuevoCargo() {
    setOpencargo({
      openModal: true,
      title: "Añadir Sucursal",
      type: "nuevo",
      id: 0,
      nombreCancelar: "Cancelar",
      nombreAceptar: "Guardar"
    })
  }
  function OpenEditCargo(id: number) {
    setOpencargo({
      openModal: true,
      title: "Editar Sucursal",
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
      <Typography variant='h6' sx={{ mb: 2 }}>Lista Colaboradores</Typography>
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
      <ModalSucursal open={openModal} titulo={title} tipo={type} closeModal={CloseCargo} id={id} nombreAceptar={nombreAceptar} nombreCancelar={nombreCancelar}></ModalSucursal>
    </>
  )
}