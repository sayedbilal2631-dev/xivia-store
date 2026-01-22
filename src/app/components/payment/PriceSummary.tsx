import { Card, CardContent, Typography, Divider, Box } from "@mui/material";


export default function PriceSummary() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={2}>Order Summary</Typography>


                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Product</Typography>
                    <Typography>$50.00</Typography>
                </Box>


                <Divider sx={{ my: 2 }} />


                <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight="bold">Total</Typography>
                    <Typography fontWeight="bold">$50.00</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
