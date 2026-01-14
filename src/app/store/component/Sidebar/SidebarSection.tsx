import { Box, List, Typography } from "@mui/material";
import SidebarItem from "./SidebarItem";

interface Props {
    title?: string;
    items: any[];
}

export default function SidebarSection({ title, items}: Props) {
    return (
        <Box mb={3}>
            {title && (
                <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", mb: 1, pl: 1 }}
                >
                    {title.toUpperCase()}
                </Typography>
            )}

            <List disablePadding>
                {items.map((item) => (
                    <SidebarItem key={item.href} {...item} />
                ))}
            </List>
        </Box>
    );
}
