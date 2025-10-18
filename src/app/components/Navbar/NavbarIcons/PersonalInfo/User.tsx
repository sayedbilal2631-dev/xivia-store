"use client"
import { PersonOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import Info from "./Info"
import { useRouter } from "next/navigation"

const User = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const userInfo = [
        { name: 'My Profile', path: '#' },
        { name: 'My Store', path: '/dashboard/createStore' },
        { name: 'My Orders', path: '#' },
        { name: 'My Message', path: '#' },
        { name: 'My Coupens', path: '#' },
        { name: 'Sign Out', path: '#' },
    ]
    const nextPage = () => {
        router.push('/auth/signIn')
    }
    return (
        <Box>
            <Box sx={{ position: "relative", display: "inline-block", zIndex: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <PersonOutline sx={{ color: 'black' }} />
                    </IconButton>
                    <Typography onClick={nextPage} sx={{ color: 'black', cursor: 'pointer' }}>Sign in</Typography>
                </Box>
                {open && (
                    <Box
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            bgcolor: "white",
                            boxShadow: 3,
                            borderRadius: "8px",
                            p: 2,
                            minWidth: "120px",
                        }}
                    >
                        {userInfo.map((item, idx) => {
                            return (
                                <Info key={idx} data={item} />
                            )
                        })}
                    </Box>
                )}
            </Box>

        </Box>
    )
}

export default User