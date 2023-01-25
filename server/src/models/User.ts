import mongoose from "mongoose";

// By using the @types/mongoose package,
// we can take advantage of TypeScript's type checking and ensure that
// the properties of the schema are defined correctly,
// and also, it's easy to understand the structure of the schema by looking at the interface.

interface IUserSchemaType extends mongoose.Schema {
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
}

// Note String here is uppercase because it is used here as a MongoDB data type
const UserSchema = new mongoose.Schema<IUserSchemaType>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    // this would create 2 fields automatically,
    // 1st is createdAt timestamp
    // 2nd is updatedAt timestamp
    { timestamps: true }
);

const User = mongoose.model<IUserSchemaType>("User", UserSchema);
export default User; // export the UserSchema model as User
export { IUserSchemaType };
