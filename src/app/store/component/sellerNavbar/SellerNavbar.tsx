"use client";
import React, { useState } from "react";
import { useRouter, } from "next/navigation";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";
import { Message, Menu as MenuIcon, } from "@mui/icons-material";
import { useMessageNotification } from "@/app/context/MessageNotificartion/MessageNotificationContext";
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, Avatar, Badge, } from "@mui/material";

const SellerNavbar = () => {
    const router = useRouter();
    const { firebaseUser } = useUser();
    const { unreadCount } = useMessageNotification();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{
                backgroundColor: "#ffffff",
                color: "#111",
                borderBottom: "1px solid #eee",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left Section */}
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton edge="start" color="inherit">
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ cursor: "pointer", color: "#ff7a18" }}
                        onClick={() => router.push("/store")}
                    >
                        Seller Panel
                    </Typography>
                </Box>

                {/* Right Section */}
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={() => router.push("/store/pages/messages")}>
                        <Badge badgeContent={unreadCount} color="error">
                            <Message />
                        </Badge>
                    </IconButton>

                    <IconButton onClick={handleMenuOpen}>
                        <Avatar sx={{ bgcolor: "#ff7a18" }}>
                            {firebaseUser?.displayName?.charAt(0) || "B"}
                        </Avatar>
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={() => router.push("/store/profile")}>Profile</MenuItem>
                        <MenuItem onClick={() => router.push("/store/settings")}>Settings</MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                router.push("/logout");
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SellerNavbar;
