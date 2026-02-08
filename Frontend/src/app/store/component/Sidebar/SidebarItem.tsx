"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface Props {
  label: string;
  href: string;
  icon: React.ElementType;
  idx: string | number;
}

export default function SidebarItem({ label, href, icon: Icon, }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <ListItemButton
      component={Link}
      href={href}
      selected={isActive}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        "&.Mui-selected": {
          backgroundColor: "#e8f0fe",
          color: "#1a73e8",
        },
        "&.Mui-selected:hover": {
          backgroundColor: "#e8f0fe",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 36,
          color: isActive ? "#1a73e8" : "inherit",
        }}
      >
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}
