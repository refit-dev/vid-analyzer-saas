import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-09-30.endive',
  typescript: true,
});

export const getStripeSession = async ({
    priceId,
    domainUrl,
    customerId,
} : {
    priceId: string;
    domainUrl: string;
    customerId: string;
}) => {
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        allowed_payment_method_types: ["card"],
        billing_address_collection: "auto",
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        customer_update: { name:"auto", address: "auto"},
        success_url: `${domainUrl}/payment/success`,
        cancel_url: `${domainUrl}/payment/cancelled`
    })

    return session.url as string
}