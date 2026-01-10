'use client'
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

const Search = () => {
  const searchDiscoury = [
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % searchDiscoury.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Box>
      <TextField
        variant="outlined"
        type="text"
        placeholder={searchDiscoury[currentIndex]}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ m: 0 }}>
              <SearchIcon
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  bgcolor: 'black',
                  width: '30px',
                  height: '25px',
                  borderRadius: '50%',
                  p: "8px",
                }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          width: {xs:'200px', md:"500px"},
          overflow: 'hidden',
          '& .MuiOutlinedInput-root': {
            borderRadius: '1000px',
            padding: 0,
            '& fieldset': {
              border: '1px solid black',
            },
            '&:hover fieldset': {
              border: '1px solid black',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid black',
            },
            '& input': {
              padding: '8px 20px',
            },
          },
        }}
      />
    </Box>

  );
};

export default Search;
