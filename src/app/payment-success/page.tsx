import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";


export default function PaymentSuccess() {
    return (
        <Box textAlign="center" mt={10}>
            <Typography variant="h4" color="green" mb={2}>
                Payment Successful
            </Typography>


            <Typography mb={4}>
                Your order has been placed successfully.
            </Typography>


            <Button variant="contained" component={Link} href="/products">
                Continue Shopping
            </Button>
        </Box>
    );
}