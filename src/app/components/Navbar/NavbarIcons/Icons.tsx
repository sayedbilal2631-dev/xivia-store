"use client";
import Link from "next/link";
import Cart from "./Cart/Cart";
import User from "./PersonalInfo/User";
import { Box, Button, Stack, } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const Icons = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
                bgcolor: "#f9fafb",
                px: 2,
                py: 1,
                borderRadius: "999px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
            }}
        >
            {/* Seller Store Button */}
            <Button
                component={Link}
                href="/store"
                startIcon={<StorefrontOutlinedIcon />}
                sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#4f46e5",
                    borderRadius: "999px",
                    px: 2,
                    "&:hover": {
                        bgcolor: "rgba(79,70,229,0.08)",
                    },
                }}
            >
                Seller Store
            </Button>

            {/* Divider Dot */}
            <Box
                sx={{
                    width: 4,
                    height: 4,
                    bgcolor: "#cbd5e1",
                    borderRadius: "50%",
                }}
            />
            {/* cart component */}
            <Cart />
            {/* user component */}
            <User />
        </Stack>
    );
};

export default Icons;
