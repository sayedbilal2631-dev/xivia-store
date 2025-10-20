"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import { Box } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // ✅ Correctly subscribe to auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []); 

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          userName={user?.displayName || user?.email || "Guest"} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <Box component="main" sx={{ flex: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
