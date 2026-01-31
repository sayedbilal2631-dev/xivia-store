"use client";
import CustomButton from "../components/common/Button";
import { Typography, Container } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";

export default function CancelPage() {
    const router = useRouter();

    return (
        <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
            <CancelIcon color="error" sx={{ fontSize: 80, mb: 2 }} />

            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Payment Cancelled
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Your payment was not completed. You can try again anytime.
            </Typography>

            <CustomButton
                variant="outlined"
                onClick={() => router.back()}
                buttonType={'soft'}
            >
                Go Back
            </CustomButton>
            <CustomButton
                variant="outlined"
                onClick={() => router.push('/')}
                buttonType={'danger'}>
                Cancel
            </CustomButton>
        </Container>
    );
}
