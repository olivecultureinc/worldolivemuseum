import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../utils/stripe";

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") || "";
  const raw = await req.text();

  try {
    const evt = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (evt.type === "checkout.session.completed") {
      const session = evt.data.object as any;

      console.log("Checkout completed:", session.id);

      // 🔐 Secure internal call to grant pass
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      await fetch(`${baseUrl}/api/pass/grant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-key": process.env.INTERNAL_GRANT_SECRET as string,
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }
}