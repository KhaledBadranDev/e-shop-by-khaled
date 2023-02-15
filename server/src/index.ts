import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // cors middleware to avoid having any cors bugs

import { router as usersRoute } from "./routes/Users";
import { router as authRoute } from "./routes/authentication/Auth";
import { router as productsRoute } from "./routes/Products";
import { router as cartsRoute } from "./routes/Carts";
import { router as ordersRoute } from "./routes/Orders";
import { router as stripeRoute } from "./routes/payment-gateway/Stripe";

const app = express();
dotenv.config(); // initiate environmental keys and constants

const connectToMongoDb = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("successfully connected to db.");
    } catch (error) {
        console.log("couldn't connected to db - ", error);
    }
};

connectToMongoDb();
app.use(cors()); // cors middleware to avoid having any cors bugs
app.use(express.json()); // to accept JSON data requests for the API

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/stripe", stripeRoute);

app.listen(process.env.PORT, () => {
    console.log("successfully listening on port.");
});
