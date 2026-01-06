"use client";
import { AuthButtonProps } from "@/app/collections/types";
import { Button, CircularProgress } from "@mui/material";
import React from "react";


export default function AuthButton({
  icon,
  label,
  onClick,
  type = "button",
  variant = "outlined",
  loading = false,
  disabled = false,
  color = "#ff6a00",
  width:width
}: AuthButtonProps) {
  return (
    <Button
      fullWidth
      startIcon={icon}
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        width:width,
        mb: 1.5,
        textTransform: "none",
        backgroundColor: variant === "contained" ? color : undefined,
        "&:hover": {
          backgroundColor:
            variant === "contained" ? "#ff8533" : "rgba(0,0,0,0.04)",
        },
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : label}
    </Button>
  );
}
