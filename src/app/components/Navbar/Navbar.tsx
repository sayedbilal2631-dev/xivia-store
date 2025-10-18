"use client"
// import Categories from '../Categories/Categories'
import { Box, Typography } from '@mui/material'
import Search from '../SearchBox/Search'
import Icons from './NavbarIcons/Icons'
import React from 'react'

const Navbar = () => {
  return (
    <Box sx={{ padding: '20px', boxShadow: '0px 0px 10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        <Typography variant='h4' fontWeight={'bold'}>Store</Typography>
        <Search />
        <Icons />
      </Box>
      {/* Navbar categories */}
      {/* <Box>
        <Categories/>
      </Box> */}
    </Box>
  )
}

export default Navbar