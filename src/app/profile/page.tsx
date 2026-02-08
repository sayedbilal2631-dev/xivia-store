"use client"
import useCurrentUser from '../hooks/getCurrentUser'
import { Box, Typography } from '@mui/material';
import React from 'react'

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
          <Typography variant='h6' fontWeight={'bold'}>About You</Typography>
          <Typography sx={{ textTransform: 'capitalize' }}>Name: {name}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Created Account</Typography>
          <Typography>{createdAt}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default page