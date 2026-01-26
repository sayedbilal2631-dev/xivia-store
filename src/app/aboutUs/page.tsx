'use client';
import { styled, keyframes } from '@mui/system';
import { Box, Container, Typography, Card, Grid } from '@mui/material';
import { Storefront, Public, Upload, Security, People, SupportAgent } from '@mui/icons-material';
import { colors } from '../constants/colors';
import Link from 'next/link';

// Animation for cards
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Styled components
const Section = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 2),
    textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    },
    animation: `${float} 4s ease-in-out infinite`,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    fontSize: 50,
    // color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
}));

export default function AboutUs() {
    return (
        <>
            <Box sx={{ backgroundColor: colors.accent, width: '100%' }}>
                <Link href={'/'} style={{ fontSize: '50px', fontWeight: 'bold', textDecoration: 'none', color: colors.darkBackground, padding: '20px' }} >Store</Link>
            </Box>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Section sx={{ backgroundColor: '#e3f2fd', borderRadius: 3 ,mt:2 }}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        Welcome to GlobalStore
                    </Typography>
                    <Typography variant="h6" color="text.secondary" maxWidth={700} mx="auto">
                        GlobalStore is your gateway to selling and buying products worldwide. Connect with buyers everywhere with ease, safety, and style.
                    </Typography>
                </Section>

                {/* Who We Are */}
                <Section>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Who We Are
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth={800} mx="auto" mb={3}>
                        At GlobalStore, we empower sellers to showcase their products to a global audience. Our mission is to simplify online selling and help entrepreneurs, creators, and small businesses thrive worldwide.
                    </Typography>
                    <Box component="img" src="/images/about-hero.png" alt="Store illustration" sx={{ maxWidth: '100%', borderRadius: 2 }} />
                </Section>

                {/* Features Section */}
                <Section sx={{ backgroundColor: '#f9f9f9' }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Why Choose GlobalStore
                    </Typography>
                    <Grid container spacing={4} mt={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                            <FeatureCard>
                                <IconWrapper><Public /></IconWrapper>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Sell Worldwide
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Reach customers around the globe and expand your business beyond local limits.
                                </Typography>
                            </FeatureCard>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                            <FeatureCard>
                                <IconWrapper><Upload /></IconWrapper>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Easy Upload
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Quickly add products with images, descriptions, and pricing in just a few clicks.
                                </Typography>
                            </FeatureCard>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                            <FeatureCard>
                                <IconWrapper><Security /></IconWrapper>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Secure Transactions
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    All payments are protected with top-level security for safe buying and selling.
                                </Typography>
                            </FeatureCard>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                            <FeatureCard>
                                <IconWrapper><Storefront /></IconWrapper>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Product Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Easily manage, edit, or remove your product listings anytime.
                                </Typography>
                            </FeatureCard>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                            <FeatureCard>
                                <IconWrapper><People /></IconWrapper>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Connect with Buyers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Communicate with buyers, get reviews, and build a trustworthy reputation.
                                </Typography>
                            </FeatureCard>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                            <FeatureCard>
                                <IconWrapper><SupportAgent /></IconWrapper>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    24/7 Support
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Our friendly support team is always here to help you with any questions or issues.
                                </Typography>
                            </FeatureCard>
                        </Grid>
                    </Grid>
                </Section>

                {/* Vision Section */}
                <Section>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Our Vision
                    </Typography>
                    <Typography variant="body1" color="text.secondary" maxWidth={800} mx="auto">
                        GlobalStore aims to become the go-to global marketplace for everyone. We empower sellers with the tools and opportunities to succeed, no matter where they are.
                    </Typography>
                </Section>

                {/* Call to Action */}
                <Section sx={{ backgroundColor: '#1976d2', color: 'white', borderRadius: 3 }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Start Selling Today
                    </Typography>
                    <Typography variant="body1" maxWidth={700} mx="auto" mb={3}>
                        Whether you are an established seller or just starting, GlobalStore gives you the platform and support to reach customers worldwide.
                    </Typography>
                    <Box component="a" href="/store" sx={{
                        display: 'inline-block',
                        padding: '14px 32px',
                        backgroundColor: 'white',
                        color: '#1976d2',
                        fontWeight: 600,
                        borderRadius: 3,
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                        '&:hover': { backgroundColor: '#e3f2fd' },
                    }}>
                        Upload Your Product
                    </Box>
                </Section>
            </Container>
        </>
    );
}
