import Navbar from "../components/Navbar/Navbar"
import { Box } from "@mui/material"
import ProductGlobalState from "../context/ProductContext/ProductContext"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProductGlobalState>
            <Box>
                <Navbar />
                {children}
            </Box>
        </ProductGlobalState>
    )
}

export default layout