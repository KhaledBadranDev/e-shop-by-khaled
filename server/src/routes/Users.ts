import { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module
import User, { IUserSchemaType } from "../models/User";
import { verifyAuthorizationToken } from "../utils/tokenHelpers";
import { AES } from "crypto-ts"; // to hash users passwords

// *##############################
// creating users API endpoints :-
// *##############################

const router = Router();

// *PUT HTTP REQUEST METHOD
// update data (email, username, password, etc) for a user in the database. 
router.put(
    "/:id",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        // :id that means the id is a variable and isn't fixed/hard-coded
        if (req.body.password) {
            // if the user wants to update the password, the password cat be null or undefined
            req.body.password = AES.encrypt(
                req.body.password,
                process.env.ENCRYPT_SECRET_KEY
            ).toString();
        }

        try {
            // *UPDATE OPERATION
            const updatedUser: IUserSchemaType = await User.findByIdAndUpdate(
                req.params.id,
                // $set: req.body to reassign the whole database document based on the request body
                {
                    $set: req.body,
                },
                { new: true } // to return the updated user
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            res.status(500).json(err);
        }
    }
);

// *DELETE HTTP REQUEST METHOD
// delete a user from the database
router.delete(
    "/:id",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *DELETE OPERATION
            await User.findByIdAndDelete();
            res.status(200).json("successfully deleted user");
        } catch (err) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            res.status(500).json(err);
        }
    }
);

export { router };
