'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { Box, Container } from '@mui/material';
import Products from './products/Products';
import { useState } from 'react';

const Page = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar search={search} onSearch={setSearch} />

        <Container maxWidth="xl">
          {/* Search */}
          <Box sx={{ display: 'flex', my: 3 }}>
            <Box flex={1}>
              <Sidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </Box>

            <Box flex={4}>
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
