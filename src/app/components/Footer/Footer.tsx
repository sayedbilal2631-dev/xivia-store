"use client";

import { Box, Container, Typography, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { FooterLink } from "./FooterLink";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#0f172a",
                color: "#e5e7eb",
                mt: 10,
                pt: 6,
                pb: 3,
            }}
        >
            <Container maxWidth={'lg'}>
                {/* Top Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        justifyContent: "space-between",
                    }}
                >
                    {/* Brand */}
                    <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" } }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                            YourStore
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#9ca3af", maxWidth: 300 }}>
                            Your trusted marketplace for quality products.
                            Buy with confidence and sell with ease.
                        </Typography>
                    </Box>

                    {/* Shop */}
                    <Box sx={{ flex: { xs: "1 1 45%", sm: "1 1 30%", md: "1 1 12%" } }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Shop
                        </Typography>
                        <FooterLink href="/products" label="All Products" />
                        <FooterLink href="/categories" label="Categories" />
                        <FooterLink href="/deals" label="Deals" />
                        <FooterLink href="/new-arrivals" label="New Arrivals" />
                    </Box>

                    {/* Company */}
                    <Box sx={{ flex: { xs: "1 1 45%", sm: "1 1 30%", md: "1 1 12%" } }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Company
                        </Typography>
                        <FooterLink href="/about" label="About Us" />
                        <FooterLink href="/contact" label="Contact" />
                        <FooterLink href="/careers" label="Careers" />
                        <FooterLink href="/blog" label="Blog" />
                    </Box>

                    {/* Legal */}
                    <Box sx={{ flex: { xs: "1 1 45%", sm: "1 1 30%", md: "1 1 12%" } }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Legal
                        </Typography>
                        <FooterLink href="/privacy-policy" label="Privacy Policy" />
                        <FooterLink href="/terms" label="Terms & Conditions" />
                        <FooterLink href="/refund-policy" label="Refund Policy" />
                        <FooterLink href="/shipping" label="Shipping Info" />
                    </Box>

                    {/* Social */}
                    <Box sx={{ flex: { xs: "1 1 45%", sm: "1 1 30%", md: "1 1 12%" } }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton sx={{ color: "#3b82f6" }}>
                                <Facebook />
                            </IconButton>
                            <IconButton sx={{ color: "#ec4899" }}>
                                <Instagram />
                            </IconButton>
                            <IconButton sx={{ color: "#06b6d4" }}>
                                <Twitter />
                            </IconButton>
                            <IconButton sx={{ color: "#0ea5e9" }}>
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 4, borderColor: "#1f2933" }} />

                {/* Bottom Bar */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                        © {new Date().getFullYear()} YourStore. All rights reserved.
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                        Built with ❤️ for modern commerce
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
