import Transaction from "../models/Transaction.js";
import Stripe from "stripe";

const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
]

// API to get all plans
export const getPlans = async (req, res) => {
    try {
        res.json({ success: true, plans })
    } catch (error) {
        res.json({ success: false, message: "Error fetching plans", error })
    }
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//API CONTROLLER For purchasing a plan
export const purchasePlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;
        const plan = plans.find(p => p._id === planId);

        if (!plan) {
            return res.status(400).json({ success: false, message: "Invalid plan ID" });
        }

        const transaction = await Transaction.create({
            userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid: false
        });
         const {origin} = req.headers;

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            success_url: `${origin}/loading`,
            cancel_url: `${origin}`,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: `${plan.name} Plan` },
                        unit_amount: plan.price * 100
                    },
                    quantity: 1
                }
            ],
            metadata: {
                transactionId: transaction._id.toString(), appId: 'MYGPT'},
                expires_at: Math.floor(Date.now() / 1000) + 30 * 60 // 30 minutes from now
            
        });
     
        return res.json({ success: true, sessionUrl: session.url });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating transaction", error: error.message });
    }
}
