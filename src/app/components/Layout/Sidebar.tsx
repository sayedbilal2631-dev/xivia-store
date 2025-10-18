import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Receipt as OrdersIcon,
  People as CustomersIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import Link from 'next/link';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon />, },
  { text: 'Products', path: '/product', icon: <ProductsIcon /> },
  { text: 'Orders', path: '/orders', icon: <OrdersIcon /> },
  { text: 'Customers', path: '/customers', icon: <CustomersIcon /> },
  { text: 'Analytics', path: '/analytics', icon: <AnalyticsIcon /> },
  { text: 'Store Settings', path: '/settings', icon: <SettingsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [active, setActive] = useState<string>('Dashboard')
  const handleChange = (item:string) => {
       setActive(item)
  }
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open === true ? 280 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: '#1e293b',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StoreIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Seller Center
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#374151' }} />

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <Link onClick={() => handleChange(item.text)} href={''} key={item.text} style={{ textDecoration: 'none', color: 'white' }}>
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: 1,
                backgroundColor: item.text === active ? '#3b82f6' : 'transparent',
                '&:hover': {
                  backgroundColor: item.text === active ? '#3b82f6' : '#374151',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;