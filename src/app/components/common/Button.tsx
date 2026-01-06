"use client";
import { Button, CircularProgress } from "@mui/material";
import { MUIButtonProps } from "@/app/collections/types";
import React from "react";

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
  bgColor,
  buttonType = "default", 
}) => {

  // 🔥 Custom Styles Map
  const styles: Record<string, any> = {
    default: {
      background: bgColor || "#1976d2",
      color: "#fff",
      "&:hover": {
        background: bgColor || "#115293",
      },
    },

    // Orange Gradient Button (Your Styling)
    orange: {
      background: "linear-gradient(90deg, #F38B2C 0%, #EB6E1F 100%)",
      color: "#fff",
      fontWeight: 600,
      px: 3,
      py: 1,
      borderRadius: "8px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
      transition: "0.25s ease",
      "&:hover": {
        background: "linear-gradient(90deg, #EB6E1F 0%, #D85F15 100%)",
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        transform: "translateY(-2px)",
      },
      "&:active": {
        transform: "scale(0.97)",
      },
    },

    // Soft Gray Button
    soft: {
      background: "#F5F5F5",
      color: "#333",
      borderRadius: "8px",
      px: 3,
      py: 1,
      "&:hover": {
        background: "#E8E8E8",
      },
    },

    // Danger Button
    danger: {
      background: "#ff4d4f",
      color: "#fff",
      borderRadius: "8px",
      px: 3,
      py: 1,
      "&:hover": {
        background: "#d9363e",
      },
    },

    // Outline Button
    outline: {
      background: "transparent",
      color: "#333",
      border: "2px solid #d9d9d9",
      borderRadius: "8px",
      px: 3,
      py: 1,
      "&:hover": {
        borderColor: "#bdbdbd",
        background: "#fafafa",
      },
    },
  };

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
      sx={{
        textTransform: "none",
        fontWeight: 500,
        mx: 1,
        borderRadius: 2,
        ...styles[buttonType], 
      }}
    >
      {isLoading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  );
};

export default MUIButton;
