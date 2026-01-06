import UserStore from './component/createstore/getstore/getStore'
import { colors } from '../constants/colors'
import { Box, Container } from '@mui/material'
import React from 'react'

const page = () => {

  return (
    <>
      {/* <Box sx={{ height: '80px', width: '100%', backgroundColor: colors.accent }}></Box> */}
      <Container maxWidth={'xl'}>
        <Box sx={{ width: { xs: '95%', md: '90%' }, margin: 'auto' }}>
          <UserStore />
        </Box>
      </Container>
    </>
  )
}

export default page