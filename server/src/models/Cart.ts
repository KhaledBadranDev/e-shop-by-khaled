import mongoose from "mongoose";

// By using the @types/mongoose package,
// we can take advantage of TypeScript's type checking and ensure that
// the properties of the schema are defined correctly,
// and also, it's easy to understand the structure of the schema by looking at the interface.

interface ICartSchemaType extends mongoose.Schema {
    products: any;
    userId: string;
}

// Note String here is uppercase because it is used here as a MongoDB data type
const CartSchema = new mongoose.Schema<ICartSchemaType>(
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
        userId: {
            type: String,
            required: true,
        },
    },
    // this would create 2 fields automatically,
    // 1st is createdAt timestamp
    // 2nd is updatedAt timestamp
    { timestamps: true }
);

const Cart = mongoose.model<ICartSchemaType>("Cart", CartSchema);
export default Cart; // export the CartSchema model as Cart
