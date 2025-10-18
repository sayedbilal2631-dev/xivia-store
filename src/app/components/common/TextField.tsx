"use client";
import React from "react";
import { TextField } from "@mui/material";

interface MUITextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  fullWidth?: boolean;
}

const MUITextField: React.FC<MUITextFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  fullWidth = true,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      error={!!error}
      helperText={error || ""}
      variant="outlined"
      sx={{ mb: 2 }}
    />
  );
};

export default MUITextField;
