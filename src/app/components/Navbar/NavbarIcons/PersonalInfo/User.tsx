"use client"
import { Box, IconButton, Typography } from "@mui/material"
import getCurrentUser from "@/app/hooks/getCurrentUser"
import { PersonOutline } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Info from "./Info"
import {
    Store as StoreIcon,
    ShoppingBag as ShoppingBagIcon,
    Message as MessageIcon,
    LocalOffer as LocalOfferIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import Link from "next/link"


const User = () => {
    const [open, setOpen] = useState(false)
    const user = getCurrentUser();
    const router = useRouter();
    const { name} = user || {};
    const userInfo = [
        { name: 'My Store', path: '/store', icon: <StoreIcon /> },
        { name: 'My Orders', path: '#', icon: <ShoppingBagIcon /> },
        { name: 'My Message', path: '#', icon: <MessageIcon /> },
        { name: 'My Coupens', path: '#', icon: <LocalOfferIcon /> },
        { name: 'Sign Out', path: '#', icon: <LogoutIcon /> },
    ];
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
                            right: 0,
                            bgcolor: "white",
                            boxShadow: 3,
                            borderRadius: "8px",
                            minWidth: "150px",
                        }}>
                        {name && (
                            <Box
                                sx={{
                                    backgroundColor: '#ECF4E8',
                                    px: 2,
                                    transition: '0.3s',
                                    cursor: 'pointer',
                                    color: 'gray',
                                    py: 1,
                                }}>
                                <Typography sx={{ display: 'flex', gap: '5px' }}>
                                    <Link
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "black")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "gray")}
                                        href={'/profile'} style={{ textDecoration: 'none', color: 'gray', cursor: 'pointer' }}>
                                        <PersonOutline />
                                        {name ? (<Box component={'span'} sx={{display:'flex', flexDirection:'column'}}><Typography component={'span'} sx={{textTransform:'capitalize'}} fontWeight={'bold'} fontSize={12}>Hi {name}</Typography > <Typography component={'span'} fontSize={10}>View your profile</Typography></Box>) : ""}
                                    </Link>
                                </Typography>
                            </Box>
                        )}
                        <Box
                            sx={{
                                p: 2,
                            }}
                        >
                            {userInfo.map((item, idx) => {
                                return (
                                    <Info key={idx} data={item} />
                                )
                            })}
                        </Box>
                    </Box>
                )}
            </Box>

        </Box>
    )
}

export default User