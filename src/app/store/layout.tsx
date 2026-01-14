import ProductGlobalState from "../context/ProductContext/ProductContext";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "./component/Sidebar/Sidebar";
import { Box } from "@mui/material";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProductGlobalState>
            <Box sx={{ position: 'fixed', width: '100%', zIndex: 999 }}>
                <Navbar />
            </Box>
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: '#F8FAFC', }}>
                {/* Sidebar */}
                <Box sx={{ position: 'fixed', mt: '110px', }}>
                    <Sidebar />
                </Box>
                {/* Page Content */}
                <Box
                    component="main"
                    sx={{
                        flex: 1, p: 3, ml: { md: "260px" }, mt: '110px', zIndex: 1
                    }}
                >
                    {children}
                </Box>
            </Box>
        </ProductGlobalState>
    );
};

export default layout;
