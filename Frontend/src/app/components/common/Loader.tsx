"use client";
import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface MUILoaderProps {
  fullScreen?: boolean;
}

const MUILoader: React.FC<MUILoaderProps> = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.7)",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <CircularProgress />
    </Box>
  );
};

export default MUILoader;
