import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
export const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <MuiLink
        component={Link}
        href={href}
        underline="none"
        sx={{
            display: "block",
            color: "#9ca3af",
            fontSize: 14,
            mb: 0.5,
            "&:hover": {
                color: "#ffffff",
            },
        }}
    >
        {label}
    </MuiLink>
);