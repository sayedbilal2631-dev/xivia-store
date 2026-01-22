import ProductGlobalState from "../context/ProductContext/ProductContext";
import Sidebar from "./component/Sidebar/Sidebar";
import { Box } from "@mui/material";
import SellerNavbar from "./component/sellerNavbar/SellerNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProductGlobalState>
            <SellerNavbar />
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: '#F8FAFC', }}>
                {/* Sidebar */}
                <Box sx={{ position: 'sticky', mt: '10px', }}>
                    <Sidebar />
                </Box>
                {/* Page Content */}
                <Box
                    component="main"
                    sx={{ flex: 1, }}
                >
                    {children}
                </Box>
            </Box>
        </ProductGlobalState>
    );
};

export default layout;
