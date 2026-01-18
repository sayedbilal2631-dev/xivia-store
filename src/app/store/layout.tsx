import ProductGlobalState from "../context/ProductContext/ProductContext";
import Sidebar from "./component/Sidebar/Sidebar";
import { Box } from "@mui/material";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProductGlobalState>
            
            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: '#F8FAFC', }}>
                {/* Sidebar */}
                <Box sx={{ position: 'sticky', mt: '110px', }}>
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
