import mongoose from "mongoose";

// By using the @types/mongoose package,
// we can take advantage of TypeScript's type checking and ensure that
// the properties of the schema are defined correctly,
// and also, it's easy to understand the structure of the schema by looking at the interface.
interface IProductSchemaType extends mongoose.Schema {
    title: string;
    description: string;
    imgReference: string;
    categories: any;
    size: string;
    bgColor: string;
    price: number;
}

const ProductSchema = new mongoose.Schema<IProductSchemaType>(
    {
        imgReference: {
            type: String,
            required: true,
        },
        bgColor: {
            type: String,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
        },
        size: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    // this would create 2 fields automatically,
    // 1st is createdAt timestamp
    // 2nd is updatedAt timestamp
    { timestamps: true }
);

const Product = mongoose.model<IProductSchemaType>("Product", ProductSchema);
export default Product; // export the ProductSchema model as Product
