import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15" as any,
});


export async function POST(req: Request) {
    const body = await req.text();
    const sig = headers().get("stripe-signature")!;


    let event: Stripe.Event;


    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (event.type === "payment_intent.succeeded") {
        const intent = event.data.object as Stripe.PaymentIntent;

    }


    return NextResponse.json({ received: true });
}