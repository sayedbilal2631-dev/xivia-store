// import Sidebar from './components/common/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Products from './products/Products'
import { Box, Grid } from '@mui/material'

const page = () => {
  return (
      <Box sx={{ width: '100%', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center' }}>
        <Box sx={{width:'100%'}}>
          <Navbar />
        </Box>
        <Box sx={{ display: 'flex', my: 3, width: '100%',  }}>
          <Box flex={'1'}>
            <Sidebar />
          </Box>
          <Box flex={'4'}>
            <Products/>
          </Box>
        </Box>
      </Box>
  )
}

export default page