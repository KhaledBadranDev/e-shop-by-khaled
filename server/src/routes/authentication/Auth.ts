import { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module
import User, { IUserSchemaType } from "../../models/User";
import { AES, enc } from "crypto-ts"; // to hash users passwords
import jwt from "jsonwebtoken"; // to generate a json web token for users to secure the API
import { WordArray } from "crypto-ts/src/lib/WordArray";

// *##############################
// creating auth API endpoints :-
// *##############################

const router = Router();

interface IUserSingInType {
    email: string;
    password: string;
}

// *POST HTTP REQUEST METHOD
// *CREATE OPERATION
// post/add a new user document to the database
// anyone can do that, no access token is required
router.post("/signup", async (req: Request, res: Response) => {
    try {
        // By doing this, the TypeScript compiler will check
        // that the req.body object has the properties
        // and types defined in the IUserSchemaType interface,
        // and will raise an error if it doesn't match.
        const reqBody: IUserSchemaType = req.body as IUserSchemaType;

        const hashedPassword: string = AES.encrypt(
            reqBody.password,
            process.env.ENCRYPT_SECRET_KEY
        ).toString(); // hash/encrypt the users password, to save it safely in the database

        // *CREATE OPERATION
        const newUserDoc = new User({
            username: reqBody.username,
            password: hashedPassword,
            email: reqBody.email,
        });

        const savedNewUserDoc = await newUserDoc.save(); // to save the new user as a doc to MongoDB
        // send a success message and the saved info
        // 201 status code means Created
        return res.status(201).json(savedNewUserDoc);
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

// *POST HTTP REQUEST METHOD
// *READ OPERATION
// sign in and generate access token
router.post("/signin", async (req: Request, res: Response) => {
    try {
        // By doing this, the TypeScript compiler will check
        // that the req.body object has the properties
        // and types defined in the IUserSchemaType interface,
        // and will raise an error if it doesn't match.
        const reqBody: IUserSingInType = req.body as IUserSingInType;

        // check email
        // *READ OPERATION
        const fetchedUserFromDB: IUserSchemaType = await User.findOne({
            email: reqBody.email,
        });

        // return keyword has to be used here as we are sending many responses
        // so the app has to return only once, otherwise it would crash

        if (!fetchedUserFromDB)
            // if the fetchedUserFromDB is null or undefined
            return res.status(401).json("Wrong Email"); // 401 status code means Unauthorized

        // check password
        const unhashedBytes: WordArray = AES.decrypt(
            fetchedUserFromDB.password,
            process.env.ENCRYPT_SECRET_KEY
        );
        const unhashedPassword: string = enc.Utf8.stringify(unhashedBytes); // Utf8 in case the password has special characters
        const enteredPassword: string = reqBody.password;
        if (enteredPassword !== unhashedPassword)
            // if the entered password is not matching the password in db
            return res.status(401).json("Wrong Password"); // 401 status code means Unauthorized

        // *ACCESS TOKEN
        // if everything is accurate, then grant the user an access token
        const accessToken = jwt.sign(
            {
                id: fetchedUserFromDB["id"],
                isAdmin: fetchedUserFromDB["isAdmin"],
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );

        // hide the password in the response
        fetchedUserFromDB["password"] = "****...";
        // send a success message, the found/fetchedUserFromDB without the password field and the accessToken
        // 200 status code means OK
        return res
            .status(200)
            .json({ ...fetchedUserFromDB["_doc"], accessToken });
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

// *POST HTTP REQUEST METHOD
// *READ OPERATION
// sign in as an admin and generate access token
router.post("/admin/signin", async (req: Request, res: Response) => {
    try {
        // By doing this, the TypeScript compiler will check
        // that the req.body object has the properties
        // and types defined in the IUserSchemaType interface,
        // and will raise an error if it doesn't match.
        const reqBody: IUserSingInType = req.body as IUserSingInType;

        // check email
        // *READ OPERATION
        const fetchedUserFromDB: IUserSchemaType = await User.findOne({
            email: reqBody.email,
        });

        // return keyword has to be used here as we are sending many responses
        // so the app has to return only once, otherwise it would crash

        if (!fetchedUserFromDB)
            // if the fetchedUserFromDB is null or undefined
            return res.status(401).json("Wrong Email"); // 401 status code means Unauthorized

        // check password
        const unhashedBytes: WordArray = AES.decrypt(
            fetchedUserFromDB.password,
            process.env.ENCRYPT_SECRET_KEY
        );
        const unhashedPassword: string = enc.Utf8.stringify(unhashedBytes); // Utf8 in case the password has special characters
        const enteredPassword: string = reqBody.password;
        if (enteredPassword !== unhashedPassword)
            // if the entered password is not matching the password in db
            return res.status(401).json("Wrong Password"); // 401 status code means Unauthorized

        // if not an admin
        if (!fetchedUserFromDB.isAdmin)
            return res
                .status(401)
                .json("You are not an admin, not enough permissions"); // 401 status code means Unauthorized

        // *ACCESS TOKEN
        // if everything is accurate, then grant the user an access token
        const accessToken = jwt.sign(
            {
                id: fetchedUserFromDB["id"],
                isAdmin: fetchedUserFromDB["isAdmin"],
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );

        // hide the password in the response
        fetchedUserFromDB["password"] = "****...";
        // send a success message, the found/fetchedUserFromDB without the password field and the accessToken
        // 200 status code means OK
        return res
            .status(200)
            .json({ ...fetchedUserFromDB["_doc"], accessToken });
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

export { router };
