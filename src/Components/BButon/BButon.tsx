
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button } from "@mui/material";
interface BButonProps {
    nombre: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>
    habilitar:boolean
}
export const BButon = ({ nombre, onClick,habilitar }: BButonProps) => {
    return (
        <LoadingButton
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            loading={habilitar}
            loadingPosition="start"
            startIcon={<VpnKeyIcon />}
            variant="outlined"
            onClick={onClick}
        >
            {nombre}
        </LoadingButton>
    )
}
 /*
 <Button
       disabled={habilitar}
       fullWidth
       variant="contained"
       sx={{ mt: 3, mb: 2 }}
       onClick={() => { setHabilitar(!habilitar) }}
   >
       {nombre}
   </Button>
*/
