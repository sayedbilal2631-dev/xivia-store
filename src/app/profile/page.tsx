"use client"
import React from 'react'
import useCurrentUser from '../hooks/getCurrentUser'
import { Box, Typography } from '@mui/material';

interface user {
  name: string,
  email: string,
  createdAt: string
}
const page = () => {
  const user = useCurrentUser()
  const { name, email, createdAt }: user = user || {};
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 2 }}>
      <Box sx={{ width: '60%' }}>
        <Typography fontWeight={'bold'}>Account settings</Typography>
        {/* About you */}
        <Box sx={{ p: 2, boxShadow: '0 0 1px', my: 2 }}>
          <Typography>About You</Typography>
          <Typography>Your Name</Typography>
          <Typography sx={{ textTransform: 'capitalize' }}>{name}</Typography>
          <Typography>Created Account</Typography>
          <Typography>{createdAt}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default page