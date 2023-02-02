import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
                Otros
            </ListSubheader>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AssignmentIcon />
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
                    <ListItem >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Contratos' />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Pagos' />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Seguros' />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Otros' />
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
}
export default { SecondaryListItems, MainListItems };