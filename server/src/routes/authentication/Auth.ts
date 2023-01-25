import express, { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module 
import User, { IUserSchemaType } from "../../models/User";
import CryptoJS from "crypto-ts"; // to hash users passwords
import jwt from "jsonwebtoken"; // to generate a json web token for users to secure the API

const router = Router();

// creating users API endpoints:

router.post("/signup", async (req: Request, res: Response) => {
    // By doing this, the TypeScript compiler will check 
    // that the req.body object has the properties 
    // and types defined in the IUserSchemaType interface,
    // and will raise an error if it doesn't match.

    const reqBody = req.body as IUserSchemaType;  

    const newUserDoc = new User({
        username: reqBody.username,
        password: reqBody.password,
        email: reqBody.email,
    });

    try {
        const savedNewUserDoc = await newUserDoc.save();   // to save the new user as a doc to MongoDB
        // send a success message and the saved info
        // 201 status code means Created
        res.status(201).json(savedNewUserDoc) 
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        res.status(500).json(error) 
    }
});

router.get("/signin", (req, res) => {});

export { router };
