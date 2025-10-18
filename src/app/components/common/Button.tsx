"use client";
import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface MUIButtonProps {
  children: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  isLoading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

const MUIButton: React.FC<MUIButtonProps> = ({
  children,
  variant = "contained",
  color = "primary",
  isLoading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = "button",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={isLoading}
      startIcon={!isLoading && startIcon}
      endIcon={!isLoading && endIcon}
      sx={{ borderRadius: 2,  textTransform: "none", fontWeight: 500, }}
    >
      {isLoading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  );
};

export default MUIButton;
