import { Box, Container, Grid } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Products from './products/Products'

const page = () => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <Navbar />
      </Box>
      <Container maxWidth={'xl'}>
        <Box sx={{ display: 'flex', my: 3, width: '100%', }}>
          <Box sx={{position:'fixed'}} flex={'1'}>
            <Sidebar />
          </Box>
          <Box flex={'4'}>
            <Products />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default page