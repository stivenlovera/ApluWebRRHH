import { Grid, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CCardResumen from "./CCardResumen/CCardResumen";
import { Config } from "./CCardResumen/Config";

interface Extra {
    uno: string;
    dos: string;
    tres: string;
}
const initialFake: Extra = {
    uno: "11",
    dos: "22",
    tres: "55",
}


interface ListCCardProps {

}
const initialState: string[] = ["", "", "", ""];
const LoadCard = () => {
    return (
        <>
            {
                initialState.map((fake, i) => (
                    <Grid container item sm={3} sx={{ p: 1 }} key={i} >
                        <Grid container item lg={12} style={{ marginBottom: 25 }} >
                            <Stack spacing={1} sx={{ minWidth: '100%' }} style={{ alignItems: "center" }} >
                                <Skeleton variant="rounded" sx={{ width: '100%' }} height={90} />
                            </Stack>
                        </Grid>
                    </Grid>
                ))
            }
        </>
    );
};

const  ListCCard = (props: ListCCardProps) => {
    const [tarjetas, setTarjetas] = useState(initialState);
    const [carga, setCarga] = useState(true);
    const tarjeras=[
        {
            data:1
        },
        {
            data:1
        },
        {
            data:1
        },
    ]
    const getTarjetas = async () => {
        try {
          
        } catch (error) {
            console.log(error);
            setCarga(false);
        }
    };
    useEffect(() => {
        getTarjetas();

    }, []);
    return (
        !carga ? (<LoadCard />) : (
            <>
                {tarjetas.map((tarjera, i) => {
                    return (<CCardResumen key={i} icon={Config(i).icon} color={Config(i).color} descripcion="demo" monto="25500" />)
                })}
            </>
        )
    );
}


export default ListCCard;