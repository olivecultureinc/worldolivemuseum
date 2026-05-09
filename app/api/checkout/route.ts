import { NextResponse } from "next/server";
import { stripe } from "../../../utils/stripe";

export async function POST() {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const priceId = process.env.STRIPE_WEEKLY_PASS_PRICE_ID;

  if (!priceId) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEEKLY_PASS_PRICE_ID" },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err.message);

    return NextResponse.json(
      { error: err.message || "Checkout creation failed" },
      { status: 500 }
    );
  }
}