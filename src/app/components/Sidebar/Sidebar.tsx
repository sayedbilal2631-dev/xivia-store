"use client";

import {
  Category,
  Checkroom,
  Devices,
  Home,
  DirectionsCar,
  Toys,
  FitnessCenter,
  HealthAndSafety,
  Construction,
  LocalShipping,
  Laptop,
  Restaurant,
} from "@mui/icons-material";
import { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import { useUser } from "@/app/context/CurrentUser/CurrentUser";

interface CategoryItem {
  id: number;
  icon: ReactElement;
  name: string;
  value: string | null; 
}

interface SidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const categories: CategoryItem[] = [
  { id: 1, icon: <Category />, name: "All Categories", value: null },
  { id: 2, icon: <Checkroom />, name: "Apparel & Accessories", value: "apparel" },
  { id: 3, icon: <Devices />, name: "Consumer Electronics", value: "electronics" },
  { id: 4, icon: <Home />, name: "Home & Garden", value: "home" },
  { id: 5, icon: <DirectionsCar />, name: "Vehicles & Accessories", value: "vehicles" },
  { id: 6, icon: <Toys />, name: "Toys & Hobbies", value: "toys" },
  { id: 7, icon: <FitnessCenter />, name: "Sports & Entertainment", value: "sports" },
  { id: 8, icon: <HealthAndSafety />, name: "Health & Beauty", value: "health" },
  { id: 9, icon: <Construction />, name: "Machinery & Equipment", value: "machinery" },
  { id: 10, icon: <LocalShipping />, name: "Transportation", value: "transportation" },
  { id: 11, icon: <Laptop />, name: "Computer & Office", value: "computer" },
  { id: 12, icon: <Restaurant />, name: "Food & Beverage", value: "food" },
];

const Sidebar = ({
  selectedCategory,
  onSelectCategory,
}: SidebarProps) => {

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: "#f9fafb",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        borderRight: "1px solid #e5e7eb",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#cbd5e1",
          borderRadius: 10,
        },
      }}
    >
      {categories.map((item) => {
        const isActive = selectedCategory === item.value;

        return (
          <Box
            key={item.id}
            onClick={() => onSelectCategory(item.value)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2.5,
              py: 1.6,
              position: "relative",
              cursor: "pointer",
              transition: "all 0.25s ease",

              bgcolor: isActive ? "#ffffff" : "transparent",
              color: isActive ? "primary.main" : "#374151",

              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: 4,
                bgcolor: isActive ? "primary.main" : "transparent",
                borderRadius: "0 4px 4px 0",
              },

              "&:hover": {
                bgcolor: "#ffffff",
                color: "primary.main",
              },

              "& svg": {
                fontSize: 20,
                color: isActive ? "primary.main" : "#6b7280",
              },

              "&:hover svg": {
                color: "primary.main",
              },
            }}
          >
            {item.icon}
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Sidebar;
