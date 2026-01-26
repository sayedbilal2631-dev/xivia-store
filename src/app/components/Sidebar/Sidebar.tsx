'use client';
import { Category, Checkroom, Devices, Home, DirectionsCar, Toys, FitnessCenter, HealthAndSafety,  Restaurant, MenuBook, LocalHospital, Pets, BusinessCenter, ChildCare, Park } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Diamond } from "lucide-react";
import { ReactElement } from "react";

interface CategoryItem {
  id: number;
  icon: ReactElement;
  name: string;
  value: string | null;
}

interface SidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isDrawer?: boolean;
}


export const categories: CategoryItem[] = [
  { id: 1, icon: <Category />, name: "All Categories", value: null },
  { id: 2, icon: <Devices />, name: "Electronics", value: "electronics" },
  { id: 3, icon: <Checkroom />, name: "Clothing", value: "clothing" },
  { id: 4, icon: <Home />, name: "Home & Kitchen", value: "home-kitchen" },
  { id: 5, icon: <HealthAndSafety />, name: "Beauty", value: "beauty" },
  { id: 6, icon: <FitnessCenter />, name: "Sports & Fitness", value: "sports-fitness" },
  { id: 7, icon: <MenuBook />, name: "Books", value: "books" },
  { id: 8, icon: <Toys />, name: "Toys & Games", value: "toys-games" },
  { id: 9, icon: <DirectionsCar />, name: "Automotive", value: "automotive" },
  { id: 10, icon: <Restaurant />, name: "Food & Beverages", value: "food-beverages" },
  { id: 11, icon: <LocalHospital />, name: "Health & Wellness", value: "health-wellness" },
  { id: 12, icon: <Diamond />, name: "Jewelry & Accessories", value: "jewelry-accessories" },
  { id: 13, icon: <Pets />, name: "Pet Supplies", value: "pet-supplies" },
  { id: 14, icon: <BusinessCenter />, name: "Office Supplies", value: "office-supplies" },
  { id: 15, icon: <ChildCare />, name: "Baby Products", value: "baby-products" },
  { id: 16, icon: <Park />, name: "Garden & Outdoor", value: "garden-outdoor" },
];


const Sidebar = ({ selectedCategory, onSelectCategory, isDrawer = false }: SidebarProps) => {

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: "#f9fafb",
        position: isDrawer ? "relative" : "sticky",
        top: isDrawer ? "auto" : 0,
        height: isDrawer ? "100vh" : "100vh",
        overflowY: "auto",
        overflowX: 'hidden',
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
