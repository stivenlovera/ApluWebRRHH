import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
interface cardConfig {
    icon: React.ReactNode;
    color: string
}
export function Config(posicion: number) {
    let config: cardConfig;
    switch (posicion) {
        case 0:
            config = {
                color: "linear-gradient(to right bottom, #0E0E0E, #939393)",
                icon: (<GroupsIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        case 1:
            config = {
                color: "linear-gradient(to right bottom, #FF0000, #FF7C7C)",
                icon: (<AttachMoneyIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        case 2:
            config = {
                color: "linear-gradient(to right bottom, #0008FF, #9295FF)",
                icon: (<TrendingUpIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        case 3:
            config = {
                color: "linear-gradient(to right bottom, #00581C, #61DA87)",
                icon: (<AccountTreeIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        default:
            //por default
            config = {
                color: "linear-gradient(to right bottom, #FF0000, #FF7C7C)",
                icon: (<AttachMoneyIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
    }
    return config
}