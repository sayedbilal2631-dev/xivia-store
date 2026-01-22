'use client';
import { Box, Container, Typography } from '@mui/material';
import Search from '../SearchBox/Search';
import Icons from './NavbarIcons/Icons';
import Link from 'next/link';

interface NavbarProps {
  search: string;
  onSearch: (value: string) => void;
}

const Navbar = ({ search, onSearch }: NavbarProps) => {
  return (
    <Box sx={{ width: '100%', boxShadow: '0px 0px 10px', py: 2, zIndex:999 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
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

          <Icons />
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
