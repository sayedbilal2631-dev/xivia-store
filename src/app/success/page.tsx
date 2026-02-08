"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomButton from "../components/common/Button";
import { Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />

            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Payment Successful 🎉
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Thank you for your purchase. Your payment was completed successfully.
            </Typography>

            <CustomButton
                variant="contained"
                onClick={() => router.push("/")}
                buttonType={'soft'}>
                Continue Shopping
            </CustomButton>
        </Container>
    );
}
