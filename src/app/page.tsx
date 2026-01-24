'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { Box, Container, Drawer, IconButton } from '@mui/material';
import Products from './products/Products';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const Page = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width:'100%' }}>
        {/* Navbar with hamburger menu */}
        <Navbar search={search} onSearch={setSearch}>
          <IconButton
            color="inherit"
            edge="start"
            sx={{
              display: { md: 'none' },
              mr: 2,
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              },
              borderRadius: 2,
              transition: 'all 0.3s ease',
              color: '#ffffff',
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

        </Navbar>

        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              my: 3,
            }}
          >
            {/* Desktop Sidebar */}
            <Box
              sx={{
                flex: { md: 1 },
                display: { xs: 'none', md: 'block' },
              }}
            >
              <Sidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                isDrawer={false}

              />
            </Box>

            {/* Mobile Drawer */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  width: 280,
                  bgcolor: '#1e293b',
                  color: '#f8fafc',
                },
              }}
            >
              <Sidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                  setMobileOpen(false);
                }}
                isDrawer
              />
            </Drawer>

            {/* Products */}
            <Box
              flex={4}
              sx={{
                borderRadius: 2,
                p: 2,
                minHeight: '80vh',
              }}
            >
              <Products
                selectedCategory={selectedCategory}
                search={search}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </QueryClientProvider>
  );
};

export default Page;
