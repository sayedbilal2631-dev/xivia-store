"use client";

import CheckoutContainer from "@/app/components/payment/CheckoutContainer";


export default function CheckoutPage({ params }: { params: { productId: string } }) {
    return <CheckoutContainer productId={params.productId} />;
}