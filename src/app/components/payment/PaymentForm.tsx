"use client";


import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Box, Button, Alert } from "@mui/material";


export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!stripe || !elements) return;
        setLoading(true);


        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
            redirect: "if_required",
        });


        if (error) {
            setError(error.message || "Payment failed");
            setLoading(false);
        }
    };


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <PaymentElement />
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}


            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                disabled={!stripe || loading}
            >
                {loading ? "Processing..." : "Pay Now"}
            </Button>
        </Box>
    );
}