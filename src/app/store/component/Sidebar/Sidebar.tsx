"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarContent from "./SidebarContent";

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
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
          bgcolor: "#fff",
          boxShadow: 2,
        }}
      >
        <MenuIcon />
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
