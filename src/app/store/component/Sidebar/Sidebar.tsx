"use client";
import { Box, Drawer, IconButton, useMediaQuery, useTheme, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CloseSharp } from "@mui/icons-material";
import SidebarContent from "./SidebarContent";
import { useState } from "react";

const drawerWidth = 260;

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  // Desktop sidebar
  if (!isMobile) {
    return (
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          borderRight: "1px solid #e0e0e0",
          minHeight: "100vh",
          bgcolor: "#fff",
        }}
      >
        <SidebarContent />
      </Box>
    );
  }

  // Mobile
  return (
    <>
      {/* toggle button */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          top: 40,
          left: 16,
          zIndex: 1300,
          bgcolor: "#fff",
          boxShadow: 2,
        }}
      >
        {open ? <CloseSharp /> : <MenuIcon />
        }
      </IconButton>

      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}
