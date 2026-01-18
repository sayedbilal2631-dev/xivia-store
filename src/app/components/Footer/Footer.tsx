// "use client";
import { Box, Container, Grid, Typography, IconButton, Divider, } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, } from "@mui/icons-material";
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
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand */}
                    <Grid size={{ md: 4, xs: 12 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                            YourStore
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                            Your trusted marketplace for quality products.
                            Buy with confidence and sell with ease.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ md: 2, xs: 6 }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Shop
                        </Typography>
                        <FooterLink href="/products" label="All Products" />
                        <FooterLink href="/categories" label="Categories" />
                        <FooterLink href="/deals" label="Deals" />
                        <FooterLink href="/new-arrivals" label="New Arrivals" />
                    </Grid>

                    {/* Company */}
                    <Grid size={{ md: 2, xs: 6 }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Company
                        </Typography>
                        <FooterLink href="/about" label="About Us" />
                        <FooterLink href="/contact" label="Contact" />
                        <FooterLink href="/careers" label="Careers" />
                        <FooterLink href="/blog" label="Blog" />
                    </Grid>

                    {/* Legal */}
                    <Grid size={{ md: 2, xs: 6 }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Legal
                        </Typography>
                        <FooterLink href="/privacy-policy" label="Privacy Policy" />
                        <FooterLink href="/terms" label="Terms & Conditions" />
                        <FooterLink href="/refund-policy" label="Refund Policy" />
                        <FooterLink href="/shipping" label="Shipping Info" />
                    </Grid>

                    {/* Social */}
                    <Grid size={{ md: 2, xs: 6 }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit">
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: "#1f2933" }} />

                {/* Bottom Bar */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
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
        </Box >
    );
};

export default Footer;


