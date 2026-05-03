import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectMongo } from "@/lib/db/mongodb";
import { OrderModel } from "@/lib/models/Order";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) {
    return NextResponse.json({ received: true, mode: "noop" });
  }

  const stripe = new Stripe(key);
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!sig) {
    return NextResponse.json({ message: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const conn = await connectMongo();
    if (conn) {
      await OrderModel.updateMany(
        { stripePaymentIntentId: intent.id },
        { $set: { status: "paid" } },
      );
    }
  }

  return NextResponse.json({ received: true });
}
