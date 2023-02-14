import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PaymentsIcon from '@mui/icons-material/Payments';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import BuildIcon from '@mui/icons-material/Build';
import { Collapse, List, ListItem } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from 'react-router-dom'
import { useState } from 'react';


const MainListItems = () => (
    <React.Fragment>
        <ListItemButton component={Link} to="/inicio">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tablero" />
        </ListItemButton>
        <ListItemButton component={Link} to="/colaborador">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Colaboradores" />
        </ListItemButton>
        <ListItemButton component={Link} to="/configuracion/asistencia">
            <ListItemIcon>
                <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary='Asistencia' />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integraciones" />
        </ListItemButton>
    </React.Fragment>
);

const SecondaryListItems = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    return (
        <>
            <ListSubheader component="div" inset>
                Configuracion
            </ListSubheader>
            <ListItemButton component={Link} to="/configuracion/contratos">
                <ListItemIcon>
                    <TaskIcon />
                </ListItemIcon>
                <ListItemText primary='Contratos' />
            </ListItemButton>
            <ListItemButton component={Link} to="/configuracion/empresas">
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary='Empresa' />
            </ListItemButton>
            <ListItemButton component={Link} to="/configuracion/entidades-bancarias">
                <ListItemIcon>
                    <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary='Pagos' />
            </ListItemButton>
            <ListItemButton component={Link} to="/configuracion/seguro-salud">
                <ListItemIcon>
                    <MedicalInformationIcon />
                </ListItemIcon>
                <ListItemText primary='Seguros/salud' />
            </ListItemButton>
            <ListItemButton component={Link} to="/configuracion/otros">
                <ListItemIcon>
                    <BuildIcon />
                </ListItemIcon>
                <ListItemText primary='Miselaneos' />
            </ListItemButton>
            {/* <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Configuracion" />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton component={Link} to="/configuracion/empresas">
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Empresa' />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/configuracion/contratos">
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Contratos' />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/configuracion/entidades-bancarias">
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Formas de pagos' />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/configuracion/seguro-salud">
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Seguros/salud' />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/configuracion/otros">
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='miselaneos' />
                    </ListItemButton>
                </List>
            </Collapse> */}
        </>
    );
}
export default { SecondaryListItems, MainListItems };