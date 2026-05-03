import mongoose, { Schema, type Model } from "mongoose";

export type OrderLineType =
  | "packaging"
  | "packaging_addon"
  | "gift"
  | "global_addon"
  | "delivery";

export type OrderLine = {
  type: OrderLineType;
  refId?: string;
  sku?: string;
  name: string;
  unitPriceCents: number;
  qty: number;
};

export type OrderDoc = {
  guestEmail?: string;
  userId?: mongoose.Types.ObjectId;
  status: "created" | "paid" | "fulfilled" | "cancelled";
  currency: string;
  lineItems: OrderLine[];
  pricing: {
    subtotalCents: number;
    deliveryCents: number;
    taxCents: number;
    discountCents: number;
    totalCents: number;
  };
  stripePaymentIntentId?: string;
  eventSlug?: string;
  createdAt: Date;
  updatedAt: Date;
};

const LineItemSchema = new Schema<OrderLine>(
  {
    type: {
      type: String,
      enum: [
        "packaging",
        "packaging_addon",
        "gift",
        "global_addon",
        "delivery",
      ],
      required: true,
    },
    refId: String,
    sku: String,
    name: { type: String, required: true },
    unitPriceCents: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<OrderDoc>(
  {
    guestEmail: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["created", "paid", "fulfilled", "cancelled"],
      default: "created",
    },
    currency: { type: String, default: "USD" },
    lineItems: { type: [LineItemSchema], default: [] },
    pricing: {
      subtotalCents: Number,
      deliveryCents: Number,
      taxCents: Number,
      discountCents: Number,
      totalCents: Number,
    },
    stripePaymentIntentId: String,
    eventSlug: String,
  },
  { timestamps: true },
);

export const OrderModel: Model<OrderDoc> =
  mongoose.models.Order ?? mongoose.model<OrderDoc>("Order", OrderSchema);
