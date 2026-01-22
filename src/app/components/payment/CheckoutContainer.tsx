"use client";


import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { stripePromise } from "@/app/lib/stripe/stripe";
import PaymentForm from "./PaymentForm";
import PriceSummary from "./PriceSummary";



export default function CheckoutContainer({ productId }: { productId: string }) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);


    useEffect(() => {
        // Replace with real product fetch
        const amount = 50; // example price
        fetch("/api/stripe/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount,
                productId,
                buyerId: "current-user-id",
            }),
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [productId]);


    if (!clientSecret) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Grid container spacing={4} p={4} maxWidth={1000} mx="auto">
            <Grid size={{ xs: 12, md: 7 }} >
                <Typography variant="h5" mb={2}>Secure Checkout</Typography>


                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm />
                </Elements>
            </Grid>


            <Grid size={{ xs: 12, md: 5 }} >
                <PriceSummary />
            </Grid>
        </Grid>
    );
}