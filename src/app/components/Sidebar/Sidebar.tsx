"use client";
import {
  Category, Checkroom, Devices, Home, DirectionsCar,
  Toys, FitnessCenter, HealthAndSafety, Construction,
  LocalShipping, Laptop, Restaurant
} from '@mui/icons-material';
import { ReactElement, useState } from 'react';
import { Box } from "@mui/material";

interface CategoryItem {
  id: number;
  icon: ReactElement;
  name: string;
}

// Global variable
let currentGlobal: [number, string] = [1, "All Categories"];

// Categories
export const categories: CategoryItem[] = [
  { id: 1, icon: <Category />, name: 'All Categories' },
  { id: 2, icon: <Checkroom />, name: 'Apparel & Accessories' },
  { id: 3, icon: <Devices />, name: 'Consumer Electronics' },
  { id: 4, icon: <Home />, name: 'Home & Garden' },
  { id: 5, icon: <DirectionsCar />, name: 'Vehicles & Accessories' },
  { id: 6, icon: <Toys />, name: 'Toys & Hobbies' },
  { id: 7, icon: <FitnessCenter />, name: 'Sports & Entertainment' },
  { id: 8, icon: <HealthAndSafety />, name: 'Health & Beauty' },
  { id: 9, icon: <Construction />, name: 'Machinery & Equipment' },
  { id: 10, icon: <LocalShipping />, name: 'Transportation' },
  { id: 11, icon: <Laptop />, name: 'Computer & Office' },
  { id: 12, icon: <Restaurant />, name: 'Food & Beverage' },
];

// Sidebar 
const Sidebar = () => {
  const [current, setCurrent] = useState<[number, string]>(currentGlobal);

  const handleClick = (item: CategoryItem) => {
    const newValue: [number, string] = [item.id, item.name];
    setCurrent(newValue);
    currentGlobal = newValue;
  };
  return (
    <Box
      sx={{
        bgcolor: '#f4f4f4',
        position: 'sticky',  
        top: 0,               
        maxHeight: '100vh',   
        overflowY: 'auto',    
        // minWidth: '250px',   
        borderRight: '1px solid #ddd',
      }}
    >
      {categories.map((item,idx) => (
        <Box
          key={idx}
          onClick={() => handleClick(item)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            p: 2,
            transition: 'all 0.3s ease-in-out',
            bgcolor: current[0] === item.id ? 'white' : 'transparent',
            '&:hover': {
              bgcolor: 'white',
              cursor: 'pointer',
            },
          }}
        >
          {item.icon}
          {item.name}
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
export { currentGlobal };
