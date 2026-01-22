"use client";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import HistoryTab from "../../component/history/HistoryTab";
import SavedTab from "../../component/history/SavedTab";
import { useState } from "react";

export default function SavedHistoryPage() {
    const [tab, setTab] = useState(0);

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={600} mb={2}>
                Saved & History
            </Typography>

            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label="Saved" />
                <Tab label="History" />
            </Tabs>

            <Box mt={3}>
                {tab === 0 && <SavedTab />}
                {tab === 1 && <HistoryTab />}
            </Box>
        </Box>
    );
}
