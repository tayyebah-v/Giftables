import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  ADD_ONS,
  GIFTS,
  PACKAGING,
  catalogMaps,
  type DeliveryTier,
} from "@/lib/catalog";
import { connectMongo } from "@/lib/db/mongodb";
import { OrderModel } from "@/lib/models/Order";
import { computeTotals } from "@/lib/pricing/computeTotals";
import type { OrderLine } from "@/lib/models/Order";

type Body = {
  email?: string;
  eventSlug?: string;
  packagingSlug?: string;
  packagingAddonSlugs?: string[];
  gifts?: { sku: string; qty: number }[];
  globalAddonSlugs?: string[];
  deliveryTier?: DeliveryTier;
  bundleDiscountCents?: number;
};

function buildLineItems(body: Body) {
  const lines: OrderLine[] = [];
  const p = PACKAGING.find((x) => x.slug === body.packagingSlug);
  if (p) {
    lines.push({
      type: "packaging",
      refId: p.slug,
      name: p.name,
      unitPriceCents: p.basePriceCents,
      qty: 1,
    });
  }
  for (const slug of body.packagingAddonSlugs ?? []) {
    const a = ADD_ONS.find((x) => x.slug === slug);
    if (a) {
      lines.push({
        type: "packaging_addon",
        refId: a.slug,
        name: a.name,
        unitPriceCents: a.priceCents,
        qty: 1,
      });
    }
  }
  for (const g of body.gifts ?? []) {
    const gi = GIFTS.find((x) => x.sku === g.sku);
    if (gi) {
      lines.push({
        type: "gift",
        sku: gi.sku,
        name: gi.name,
        unitPriceCents: gi.priceCents,
        qty: g.qty,
      });
    }
  }
  for (const slug of body.globalAddonSlugs ?? []) {
    const a = ADD_ONS.find((x) => x.slug === slug);
    if (a) {
      lines.push({
        type: "global_addon",
        refId: a.slug,
        name: a.name,
        unitPriceCents: a.priceCents,
        qty: 1,
      });
    }
  }
  if (body.deliveryTier) {
    lines.push({
      type: "delivery",
      refId: body.deliveryTier,
      name: `Delivery (${body.deliveryTier})`,
      unitPriceCents:
        catalogMaps().deliveryByTier[body.deliveryTier] ?? 0,
      qty: 1,
    });
  }
  return lines;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Body;

  if (
    !body.email ||
    !body.packagingSlug ||
    !body.deliveryTier ||
    !body.gifts?.length
  ) {
    return NextResponse.json(
      { message: "Missing required checkout fields." },
      { status: 400 },
    );
  }

  const totals = computeTotals(
    {
      packagingSlug: body.packagingSlug,
      packagingAddonSlugs: body.packagingAddonSlugs ?? [],
      gifts: body.gifts ?? [],
      globalAddonSlugs: body.globalAddonSlugs ?? [],
      deliveryTier: body.deliveryTier,
      bundleDiscountCents: 0,
    },
    catalogMaps(),
  );

  const lineItems = buildLineItems({
    ...body,
    packagingSlug: body.packagingSlug,
    deliveryTier: body.deliveryTier,
  });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    const conn = await connectMongo();
    if (conn) {
      await OrderModel.create({
        guestEmail: body.email,
        status: "created",
        lineItems,
        pricing: {
          subtotalCents: totals.subtotalCents,
          deliveryCents: totals.deliveryCents,
          taxCents: totals.taxCents,
          discountCents: totals.discountCents,
          totalCents: totals.totalCents,
        },
        eventSlug: body.eventSlug,
      });
    }
    return NextResponse.json({
      mode: "demo",
      clientSecret: null,
      totals,
    });
  }

  const stripe = new Stripe(stripeKey);

  const intent = await stripe.paymentIntents.create({
    amount: totals.totalCents,
    currency: "usd",
    receipt_email: body.email,
    automatic_payment_methods: { enabled: true },
    metadata: {
      eventSlug: body.eventSlug ?? "",
    },
  });

  const conn = await connectMongo();
  if (conn) {
    await OrderModel.create({
      guestEmail: body.email,
      status: "created",
      lineItems,
      pricing: {
        subtotalCents: totals.subtotalCents,
        deliveryCents: totals.deliveryCents,
        taxCents: totals.taxCents,
        discountCents: totals.discountCents,
        totalCents: totals.totalCents,
      },
      stripePaymentIntentId: intent.id,
      eventSlug: body.eventSlug,
    });
  }

  return NextResponse.json({
    mode: "live",
    clientSecret: intent.client_secret,
    totals,
  });
}
