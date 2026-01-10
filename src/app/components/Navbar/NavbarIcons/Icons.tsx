// import { Language, SupportAgentOutlined } from '@mui/icons-material';
import User from './PersonalInfo/User';
import { Box} from "@mui/material"
import Cart from './Cart/Cart';

const Icons = () => {
    // const [openCart, setOpenCart] = useState(false);
    return (
        <Box sx={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
            <Cart/>
            <User />
            {/* <SupportAgentOutlined />
            <Language /> */}
        </Box>
    )
}

export default Icons