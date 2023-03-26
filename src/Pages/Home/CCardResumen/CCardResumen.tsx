import { Box, Card, CardContent, Grid, Skeleton, Stack, Typography } from "@mui/material";

export interface CCardResumenProps {
    color: string,
    monto: string
    descripcion: string;
    icon: React.ReactNode;
    estado?: boolean;
}
const LoadCard = () => {
    return (
        <Grid container item sm={3} sx={{ p: 1 }}>
            <Grid container item lg={12} style={{ marginBottom: 25 }} >
                <Stack spacing={1} sx={{ minWidth: '100%' }} style={{ alignItems: "center" }} >
                    <Skeleton variant="rounded" sx={{ width: '100%' }} height={90} />
                </Stack>
            </Grid>
        </Grid>
    )
}
const CCardResumen = ({ color, descripcion, monto, icon, estado }: CCardResumenProps) => {
    return (
        estado ? (<LoadCard />) : (
            <Grid container item sm={3} sx={{ p: 1 }}>
                <Grid container item lg={12} style={{ marginBottom: 0 }} >
                    <Card sx={{ minWidth: '100%' }} style={{ background: color }} onMouseEnter={() => console.log("efecto hover")}>
                        <CardContent sx={{ display: 'flex' }} style={{ padding: 1 }}>
                            {icon}
                            <Box style={{ width: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5" style={{ margin: 0, textAlign: 'center', fontWeight: 'bold', color: "white" }}>{monto}</Typography>
                                    <Typography variant="subtitle1" style={{ margin: 0, textAlign: 'center', color: "white" }}>{descripcion}</Typography>
                                </CardContent>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        )
    );
}

export default CCardResumen;