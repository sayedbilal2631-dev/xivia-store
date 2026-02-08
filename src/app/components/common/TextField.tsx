"use client";
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { MUITextFieldProps } from "@/app/collections/types";


const MUITextFieldEnhanced: React.FC<MUITextFieldProps> = ({
  label,
  type = "",
  value,
  onChange,
  error,
  fullWidth = true,
  multiline = false,
  rows,
  margin = "normal",
  select = false,
  disabled = false,
  required = false,
  placeholder = "",
}) => {
  const primaryColor = "#4a90e2"; 
  const errorColor = "#d0021b"; 
  const neutralColor = "#e0e0e0"; 
  const backgroundColor = "#f9f9f9"; 

  // Password Visibility 
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  //Render Logic
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <TextField
      label={label}
      type={inputType}
      value={value ?? ""}
      onChange={onChange}
      fullWidth={fullWidth}
      error={!!error}
      helperText={error || ""}
      variant="outlined"
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      margin={margin}
      select={select}
      sx={{
        mb: 3, 
        "& .MuiInputBase-root": {
          backgroundColor: backgroundColor,
          borderRadius: "16px", // More rounded corners
          transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)", // Smoother transition
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // Subtle initial shadow
          
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // Enhanced shadow on hover
          },
          
          "&.Mui-focused": {
            boxShadow: `0 0 0 4px ${primaryColor}40`, // Focus ring effect
            
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: primaryColor, // Primary color border on focus
              borderWidth: "2px", // Thicker border on focus
            },
          },
          
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: errorColor, // Error color border
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 4px ${errorColor}40`, // Error focus ring
            },
          },
          
          "&.Mui-disabled": {
            backgroundColor: "#f0f0f0",
            boxShadow: "none",
            opacity: 0.7,
          },
        },
        
        // Notched Outline (The actual border)
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: neutralColor,
          transition: "border-color 0.4s ease, border-width 0.4s ease",
        },

        // Input Label Styling
        "& .MuiInputLabel-root": {
          fontWeight: 500,
          color: "#666", // Slightly darker neutral color
          transition: "color 0.4s ease, transform 0.4s ease",
          
          "&.Mui-focused": {
            color: primaryColor, // Primary color on focus
            fontWeight: 600, // Bolder on focus
          },
          
          "&.Mui-error": {
            color: errorColor,
          },
        },

        // Helper Text Styling
        "& .MuiFormHelperText-root": {
          marginLeft: "16px", // Align with the input padding
          fontSize: "0.8rem",
          
          "&.Mui-error": {
            color: errorColor,
            fontWeight: 500,
          },
        },

        // Password Adornment Styling
        ...(isPassword && {
          "& .MuiInputAdornment-root": {
            marginRight: "8px",
            "& .MuiIconButton-root": {
              color: "#999",
              "&:hover": {
                color: primaryColor,
              },
            },
          },
        }),
      }}
      InputProps={{
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default MUITextFieldEnhanced;
