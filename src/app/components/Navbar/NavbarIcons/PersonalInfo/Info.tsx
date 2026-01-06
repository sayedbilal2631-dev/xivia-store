"use client"
import { Box, IconButton, Typography } from "@mui/material";
import useCurrentUser from "@/app/hooks/getCurrentUser";
import { auth } from "@/app/config/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

const Info = ({ data }: any) => {
    const user = useCurrentUser()
    const handleSignOut = async (name: string) => {
        try {
            if (name === "Sign Out") {
                await signOut(auth)
            }
            user.setUser(null)
        } catch (error) {
            console.log('Sign out error', error)
        }
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {data.icon}
                <Link
                    key={data.path}
                    href={data.path}
                    style={{
                        textDecoration: "none",
                        color: "gray",
                        fontSize: "13px",
                        transition: "0.3s",
                        paddingBlock: '8px',
                        paddingInline: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                    }}
                    onClick={() => handleSignOut(data.name)}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "black")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "gray")}
                >
                    {data.name}
                </Link>
            </Box>
        </Box>
    );
};

export default Info;
