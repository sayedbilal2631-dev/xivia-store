"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  InputBase,
  alpha,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import MUIButton from "../common/Button";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "300px",
      "&:focus": {
        width: "400px",
      },
    },
  },
}));

interface HeaderProps {
  userName: string | null;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onMenuClick }) => {
  const [hasStore, setHasStore] = useState(false);
  const [storeName, setStoreName] = useState<string | null>(null);
  const router = useRouter();

  // 🔹 Check if user has a store in Firestore and get store name
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(collection(db, "stores"), where("ownerId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setHasStore(true);
            const storeData = querySnapshot.docs[0].data();
            setStoreName(storeData.storeName || "My Store");
          } else {
            setHasStore(false);
            setStoreName(null);
          }
        } catch (error) {
          console.error("Error fetching store:", error);
        }
      } else {
        setHasStore(false);
        setStoreName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    if (hasStore) {
      router.push("/dashboard/addProduct");
    } else {
      router.push("/dashboard/createStore");
    }
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "white", color: "text.primary" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* 🔹 Show store name or fallback */}
        <Typography sx={{ fontWeight: "bold", mr: 3 }}>
          {storeName ? storeName.toUpperCase() : `${userName?.toUpperCase() || "USER"} STORE`}
        </Typography>

        <Search sx={{ flexGrow: 1, maxWidth: 500 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search orders, products, customers..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <MUIButton variant="contained" color="secondary" onClick={handleButtonClick}>
          {hasStore ? "Add Product" : "Create Store"}
        </MUIButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={7} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
