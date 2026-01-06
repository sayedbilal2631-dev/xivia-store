"use client"
import { Box, Container, Typography } from '@mui/material'
import Search from '../SearchBox/Search'
import Icons from './NavbarIcons/Icons'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <Box sx={{ width: '100%', boxShadow: '0px 0px 10px', py: 2 }}>
      <Container maxWidth={'xl'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography variant='h4' fontWeight={'bold'}>
            <Link style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} href={'/'}>Store</Link>
          </Typography>

          <Search />
          <Icons />
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar