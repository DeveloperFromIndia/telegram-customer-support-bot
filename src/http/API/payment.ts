import crypto from "crypto";
import axios from "axios";

const FONDY_MERCHANT_ID = process.env.FONDY_MERCHANT_ID!;
const FONDY_MERCHANT_PASSWORD = process.env.FONDY_SECRET_KEY!.trim();

interface FondyPaymentParams {
    amount: number;
    order_id?: string;
    order_desc?: string;
    currency?: string;
}

function generateFondySignature(merchantPassword: string, params: Record<string, any>): string {
    const sortedKeys = Object.keys(params).sort();

    const stringValues = sortedKeys.map(key => String(params[key]));
    const values = [merchantPassword, ...stringValues];

    const baseString = values.join("|");

    const hash = crypto.createHash("sha1")
        .update(baseString)
        .digest("hex")
        .toLowerCase();

    return hash;
}

export async function createFondyPayment(params: FondyPaymentParams) {
    const order_id = params.order_id || `order_${Date.now()}`;
    const order_desc = params.order_desc || "Payment";
    const currency = params.currency || "UAH";
    const amount = params.amount;

    const requestPayload: Record<string, any> = {
        amount,
        order_id,
        order_desc,
        currency,
        merchant_id: FONDY_MERCHANT_ID,
        server_callback_url: "https://0d8ca808621b.ngrok-free.app/fondy/webhook",
        required_rectoken: "Y",
    };

    const signature = generateFondySignature(FONDY_MERCHANT_PASSWORD, requestPayload);

    const body = {
        request: {
            ...requestPayload,
            signature,
        },
    };

    try {
        const res = await axios.post("https://pay.fondy.eu/api/checkout/url/", body, {
            headers: { "Content-Type": "application/json" }
        });

        return res.data.response;
    } catch (error) {

    }
}