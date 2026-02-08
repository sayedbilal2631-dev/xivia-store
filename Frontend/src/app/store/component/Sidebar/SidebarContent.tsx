import { Box, Typography } from "@mui/material";
import SidebarSection from "./SidebarSection";
import { sidebarSections } from "@/app/constants/store";

export default function SidebarContent() {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Seller Store
            </Typography>

            {sidebarSections.map((section, index) => (
                <SidebarSection
                    key={index}
                    title={section.title}
                    items={section.items}
                />
            ))}
        </Box>
    );
}
