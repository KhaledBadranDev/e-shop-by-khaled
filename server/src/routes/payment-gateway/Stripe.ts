import { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module
const Stripe = require("stripe");
const uuid = require("uuid");

const STRIPE_SECRET_KEY: any = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(STRIPE_SECRET_KEY);

const router = Router();

router.post("/checkout", async (req: Request, res: Response) => {
    // documentation:   https://stripe.com/docs/api/idempotent_requests
    // A good way to generate an idempotencyKey is to use a unique identifier
    // that is guaranteed to be unique across all requests,
    // such as a UUID (universally unique identifier).
    // This can be generated using a library such as the uuid package in Node.js,
    // or using JavaScript's built-in Math.random() function.
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.price,
            description: req.body.description,
            currency: "cad",
        },
        {
            idempotencyKey: uuid.v4(),
        },
        (error: unknown, charge: unknown) => {
            // asynchronously called
            if (error) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(charge);
            }
        }
    );
});

export { router };
