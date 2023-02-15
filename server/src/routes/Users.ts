import { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module
import User, { IUserSchemaType } from "../models/User";
import {
    verifyAdminToken,
    verifyAuthorizationToken,
} from "../utils/tokenHelpers";
import { AES } from "crypto-ts"; // to hash users passwords

// *######################################################################
// *Creating Users API endpoints and implementing Users CRUD operations :-
// *######################################################################

const router = Router();

// *NOTE ORDER OF ROUTES MATTERS:
//  the first route that match the request path will be the one that is executed.

// *PUT HTTP REQUEST METHOD
// *UPDATE OPERATION
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
            // send the updated user info and the ok status code
            // 200 status code means OK
            return res.status(200).json(updatedUser);
        } catch (err) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(err);
        }
    }
);

// *DELETE HTTP REQUEST METHOD
// *DELETE OPERATION
// delete a user from the database
router.delete(
    "/:id",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *DELETE OPERATION
            await User.findByIdAndDelete(req.params.id);
            // send a success message and the ok status code
            // 200 status code means OK
            return res.status(200).json("successfully deleted user");
        } catch (err) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(err);
        }
    }
);



// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get all user from the database
router.get("/", verifyAdminToken, async (req: Request, res: Response) => {
    try {
        const queryLimit: number | any = req.query.limit;
        // if we need to limit number of users being fetched
        // the http method would somehow as follows:
        // http://localhost:5000/api/users?limit=3
        // otherwise to tech all of the users:
        // http://localhost:5000/api/users
        // *READ OPERATION
        const allFetchedUsersFromDB: IUserSchemaType[] = queryLimit
            ? await User.find().limit(queryLimit)
            : await User.find();
        // hide the password in the response for each element/user
        // thus forEach loop over the whole array
        allFetchedUsersFromDB.forEach((fetchedUserFromDB: IUserSchemaType) => {
            fetchedUserFromDB["password"] = "****...";
        });
        // send the fetched user from MongoDB and the ok status code
        // 200 status code means OK
        return res.status(200).json(allFetchedUsersFromDB);
    } catch (err) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(err);
    }
});

// TODO: TO FIX NOT WORKING
// *GET HTTP REQUEST METHOD
// *READ OPERATION
// *Aggregate data is considered to be a read operation
// get users statistics
router.get(
    "/statistics",
    verifyAdminToken,
    async (req: Request, res: Response) => {
        console.log("users stats");
        try {
            const date: Date = new Date();
            const lastYear: Date = new Date(
                date.setFullYear(date.getFullYear() - 1)
            );
            // group all the users created at the same month
            // *READ OPERATION
            // *Aggregate data is considered to be a read operation
            const usersPerMonthStatsData: any = await User.aggregate([
                // gte stands for greater than or equal to
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: {
                            $concat: [
                                { $toString: "$year" },
                                "-",
                                { $toString: "$month" },
                            ],
                        },
                        total: { $sum: 1 },
                    },
                },
            ]);
            // send the grouped stats data and the OK status code
            // 200 status code means OK
            return res.status(200).json(usersPerMonthStatsData);
        } catch (err) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(err);
        }
    }
);

// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get a user by id from the database
router.get("/:id", verifyAdminToken, async (req: Request, res: Response) => {
    try {
        // *READ OPERATION
        const fetchedUserFromDB: IUserSchemaType = await User.findById(
            req.params.id
        );

        // hide the password in the response
        fetchedUserFromDB["password"] = "****...";
        // send the fetched user from MongoDB and the ok status code
        // 200 status code means OK
        return res.status(200).json(fetchedUserFromDB);
    } catch (err) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(err);
    }
});

export { router };
