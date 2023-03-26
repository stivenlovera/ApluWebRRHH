import { Grid, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { HomeTarjetaServicio } from "../../Service/ApiRRHH/HomeServicio";
import CCardResumen, { CCardResumenProps } from "./CCardResumen/CCardResumen";
import { Config } from "./CCardResumen/Config";

interface ListCCardProps {

}
const initialState: CCardResumenProps[] = [
    {
        color: "0",
        descripcion: "Total fake",
        icon: "0",
        monto: "000"
    },
    {
        color: "0",
        descripcion: "Total fake",
        icon: "0",
        monto: "000"
    }
];

const ListCCard = (props: ListCCardProps) => {
    const [tarjetas, setTarjetas] = useState(initialState);
    const [carga, setCarga] = useState(true);

    const getTarjetas = async () => {
        const { data} =await HomeTarjetaServicio();
        setTarjetas(data.data);
        setCarga(false);
    };

    useEffect(() => {
        getTarjetas();

    }, []);
    return (
        <>
            {tarjetas.map((tarjera, i) => {
                return (
                    <CCardResumen
                        key={i}
                        icon={Config(i).icon}
                        color={Config(i).color}
                        descripcion={tarjera.descripcion}
                        monto={tarjera.monto}
                        estado={carga}
                    />
                )
            })}
        </>
    );
}


export default ListCCard;