"use client";

import ProductGlobalState from "../context/ProductContext/ProductContext";
import SellerNavbar from "./component/sellerNavbar/SellerNavbar";
import Sidebar from "./component/Sidebar/Sidebar";
import { Box, Container } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProductGlobalState>
            <SellerNavbar />

            {/* Main Wrapper */}
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#F8FAFC",
                    pt: 2,
                }}
            >
                <Container maxWidth="xl">
                    {/* Flex Layout */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 3,
                        }}
                    >
                        {/* Sidebar */}
                        <Box
                            sx={{
                                width: { xs: "100%", md: 260 },
                                flexShrink: 0,
                                position: { md: "sticky" },
                                top: { md: 80 }, // below navbar
                                alignSelf: "flex-start",
                            }}
                        >
                            <Sidebar />
                        </Box>

                        {/* Page Content */}
                        <Box
                            component="main"
                            sx={{
                                flex: 1,
                                width: "100%",
                                minHeight: "70vh",
                            }}
                        >
                            {children}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ProductGlobalState>
    );
};

export default Layout;
