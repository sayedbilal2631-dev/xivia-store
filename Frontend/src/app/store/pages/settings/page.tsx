import CurrentUser from '@/app/components/UserInfo/CurrentUser'
import DangerZone from '@/app/components/UserInfo/DangerZone'
import SecurityForm from '@/app/components/UserInfo/SecurityForm'
import StoreForm from '@/app/components/UserInfo/StoreForm'
import { Box, Divider } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <Box sx={{ p: 2 }}>
            <CurrentUser />

            <Divider sx={{ my: 3 }} />

            <StoreForm />

            <Divider sx={{ my: 4 }} />

            <SecurityForm />

            <Divider sx={{ my: 4 }} />

            <DangerZone />
        </Box>
    )
}

export default page