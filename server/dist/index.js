"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // cors middleware to avoid having any cors bugs
const Users_1 = require("./routes/Users");
const Auth_1 = require("./routes/authentication/Auth");
const Products_1 = require("./routes/Products");
const Carts_1 = require("./routes/Carts");
const Orders_1 = require("./routes/Orders");
const Stripe_1 = require("./routes/payment-gateway/Stripe");
const app = (0, express_1.default)();
dotenv_1.default.config(); // initiate environmental keys and constants
const connectToMongoDb = async () => {
    try {
        mongoose_1.default.set("strictQuery", true);
        const db = await mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("successfully connected to db.");
    }
    catch (error) {
        console.log("couldn't connected to db - ", error);
    }
};
connectToMongoDb();
app.use((0, cors_1.default)()); // cors middleware to avoid having any cors bugs
app.use(express_1.default.json()); // to accept JSON data requests for the API
app.use("/api/users", Users_1.router);
app.use("/api/auth", Auth_1.router);
app.use("/api/products", Products_1.router);
app.use("/api/carts", Carts_1.router);
app.use("/api/orders", Orders_1.router);
app.use("/api/checkout", Stripe_1.router);
app.listen(process.env.PORT, () => {
    console.log("successfully listening on port.");
});
//# sourceMappingURL=index.js.map