"use client"
import { Box, Typography } from "@mui/material"
import ProductPerformance from "../components/Dashboard/ProductPerformance"
import RecentOrders from "../components/Dashboard/RecentOrder"
import StatsCards from "../components/Dashboard/StatsCard"


const page = () => {
 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '50px' }}>
      <StatsCards />
      <ProductPerformance />
      <RecentOrders />
    </Box>
  )
}

export default page