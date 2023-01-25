import mongoose from "mongoose";

// By using the @types/mongoose package,
// we can take advantage of TypeScript's type checking and ensure that
// the properties of the schema are defined correctly,
// and also, it's easy to understand the structure of the schema by looking at the interface.

interface IOrderSchemaType extends mongoose.Schema {
    products: any;
    quantity: number;
    status: string;
    userId: string;
    address: string;
}

// Note String here is uppercase because it is used here as a MongoDB data type
const OrderSchema = new mongoose.Schema<IOrderSchemaType>(
    {
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        quantity: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
        userId: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    // this would create 2 fields automatically,
    // 1st is createdAt timestamp
    // 2nd is updatedAt timestamp
    { timestamps: true }
);

const Order = mongoose.model<IOrderSchemaType>("Order", OrderSchema);
export default Order; // export the OrderSchema model as Order
