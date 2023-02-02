import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
type JSXComponent = () => JSX.Element;
interface CCardResumenProps {
    color:string,
    monto:string
    descripcion:string;
    icon:React.ReactNode;
}

const CCardResumen = ({color,descripcion,monto,icon}:CCardResumenProps) => {
    return (
        <Grid container item sm={3} sx={{ p: 1 }}>
            <Grid container item lg={12} style={{ marginBottom: 0 }} >
                <Card sx={{ minWidth: '100%' }} style={{ background: color }}  onMouseEnter={() => console.log("efecto hover")}>
                    <CardContent sx={{ display: 'flex' }} style={{ padding: 0 }}>
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
    );
}

export default CCardResumen;