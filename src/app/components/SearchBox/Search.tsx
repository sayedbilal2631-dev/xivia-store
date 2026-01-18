'use client';
import { Box, TextField, InputAdornment, alpha, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";

interface SearchProps {
  value: string;
  onSearch: (value: string) => void;
}

const Search = ({ value, onSearch }: SearchProps) => {
  const searchDiscovery = [
    "New Fall Fashion Women",
    "Shelgem",
    "Dress",
    "Jeans",
    "Tops",
    "Bags",
    "Skirt",
    "Nails",
    "Glowmode",
    "Shoes",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [showTrending, setShowTrending] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % searchDiscovery.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      position: "relative"
    }}>
      <Box sx={{
        position: "relative",
        width: { xs: "100%", sm: "450px", md: "600px" }
      }}>
        {/* Glow effect behind search */}
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% + 20px)",
          height: "calc(100% + 20px)",
          background: isFocused
            ? "radial-gradient(circle at center, rgba(255, 107, 107, 0.1) 0%, transparent 70%)"
            : "none",
          filter: "blur(10px)",
          zIndex: 0,
          transition: "all 0.3s ease",
        }} />

        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          placeholder="Search for products, brands, and more..."
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setShowTrending(false);
          }}
          onKeyDown={handleKeyDown}
          onClick={() => setShowTrending(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ ml: 2, mr: 1 }}>
                <SearchIcon sx={{
                  color: isFocused ? "#FF6B6B" : alpha("#000", 0.6),
                  transition: "color 0.3s ease"
                }} />
              </InputAdornment>
            ),
            endAdornment: inputValue && (
              <InputAdornment position="end" sx={{ mr: 1 }}>
                <IconButton
                  onClick={handleClear}
                  size="small"
                  sx={{
                    backgroundColor: alpha("#000", 0.05),
                    width: 28,
                    height: 28,
                    '&:hover': {
                      backgroundColor: alpha("#FF6B6B", 0.1),
                    }
                  }}
                >
                  <ClearIcon sx={{
                    fontSize: 16,
                    color: alpha("#000", 0.5),
                    '&:hover': {
                      color: "#FF6B6B",
                    }
                  }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              paddingRight: inputValue ? "52px" : "12px",
              backdropFilter: "blur(10px)",
            }
          }}
          sx={{
            position: "relative",
            zIndex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: "50px",
              backgroundColor: alpha("#fff", 0.9),
              border: "1px solid",
              borderColor: isFocused
                ? alpha("#FF6B6B", 0.4)
                : alpha("#e0e0e0", 0.8),
              boxShadow: isFocused
                ? "0 20px 40px rgba(255, 107, 107, 0.15), 0 4px 20px rgba(0, 0, 0, 0.08)"
                : "0 10px 30px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.03)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isFocused ? "translateY(-2px)" : "none",
              height: "56px",
              '&:hover': {
                borderColor: isFocused
                  ? alpha("#FF6B6B", 0.6)
                  : alpha("#b0b0b0", 0.6),
                backgroundColor: alpha("#fff", 0.95),
                boxShadow: "0 15px 35px rgba(255, 107, 107, 0.1), 0 4px 15px rgba(0, 0, 0, 0.06)",
              },
              '&.Mui-focused': {
                borderColor: alpha("#FF6B6B", 0.8),
                boxShadow: "0 25px 50px rgba(255, 107, 107, 0.2), 0 4px 25px rgba(0, 0, 0, 0.1)",
              },
              '& input': {
                padding: "16px 20px",
                fontSize: "16px",
                fontWeight: 400,
                letterSpacing: "0.3px",
                color: alpha("#000", 0.8),
                '&::placeholder': {
                  color: alpha("#000", 0.5),
                  transition: "opacity 0.3s ease",
                },
              },
            },
          }}
        />
        {/* clear input */}
        <Box
          onClick={handleClear}
          sx={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            color: 'red'
          }}
        >
          Clear
        </Box>
        {/* Elegant Search Button */}
        <Box
          onClick={handleSearch}
          sx={{
            position: "absolute",
            right: inputValue ? "52px" : "8px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: isFocused
              ? "linear-gradient(135deg, #FF6B6B, #FF8E53)"
              : "linear-gradient(135deg, #333, #555)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isFocused
              ? "0 6px 20px rgba(255, 107, 107, 0.4), 0 2px 6px rgba(0, 0, 0, 0.1)"
              : "0 4px 15px rgba(0, 0, 0, 0.1)",
            '&:hover': {
              transform: "translateY(-50%) scale(1.1)",
              boxShadow: "0 8px 25px rgba(255, 107, 107, 0.5), 0 3px 8px rgba(0, 0, 0, 0.15)",
              background: "linear-gradient(135deg, #FF5252, #FF7B3D)",
            },
            '&:active': {
              transform: "translateY(-50%) scale(0.95)",
            },
          }}
        >
          <SearchIcon sx={{
            color: "white",
            fontSize: "20px",
            transition: "transform 0.3s ease"
          }} />
        </Box>

        {/* Trending Badge Appears on hover */}
        {showTrending && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "-40px",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "8px 16px",
              backgroundColor: alpha("#fff", 0.95),
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha("#e0e0e0", 0.5)}`,
              animation: "slideUp 0.3s ease-out",
              '@keyframes slideUp': {
                from: {
                  opacity: 0,
                  transform: "translateX(-50%) translateY(10px)"
                },
                to: {
                  opacity: 1,
                  transform: "translateX(-50%) translateY(0)"
                },
              }
            }}
          >
            <TrendingUpIcon sx={{
              fontSize: "16px",
              color: "#FF6B6B"
            }} />
            <Box component="span" sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: alpha("#000", 0.7)
            }}>
              Trending: {searchDiscovery[currentIndex]}
            </Box>
          </Box>
        )}

      </Box>
    </Box>
  );
};

export default Search;