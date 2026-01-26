'use client';
import { Box, Container, Typography } from '@mui/material';
import Search from '../SearchBox/Search';
import Icons from './NavbarIcons/Icons';
import { ReactNode } from 'react';
import Link from 'next/link';

interface NavbarProps {
  search: string;
  onSearch: (value: string) => void;
  children?: ReactNode
}

const Navbar = ({ search, onSearch, children }: NavbarProps) => {
  
  return (
    <Box sx={{ width: '100%', boxShadow: '0px 0px 10px', py: 2, zIndex: 999 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            <Link
              href="/"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Store
            </Link>
          </Typography>

          {/* Search connected to page state */}
          <Search value={search} onSearch={onSearch} />
          <Box sx={{display:'flex', gap:'20px'}}>
            <Icons />
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
