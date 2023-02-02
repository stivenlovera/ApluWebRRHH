import { Backdrop, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { SideBar } from "../../Components/Sidebar/sidebar";
import ListCCard from "./ListCCard";

const Home = () => {
    const [open, setOpen] = useState(true);

    setTimeout(() => {
        console.log('aki')
        setOpen(false);
    }, 2000);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ p: 1 }}>
                    <Typography variant="h4" component="h2">
                        Bienvenido
                    </Typography>
                    <Grid container item xs={12} alignItems="center" justifyContent="center">
                        <ListCCard />
                    </Grid>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default Home;