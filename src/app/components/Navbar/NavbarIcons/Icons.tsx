import User from './PersonalInfo/User';
import { Box} from "@mui/material"
import Cart from './Cart/Cart';

const Icons = () => {
    return (
        <Box sx={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
            
            <Cart/>
            <User />
        </Box>
    )
}

export default Icons