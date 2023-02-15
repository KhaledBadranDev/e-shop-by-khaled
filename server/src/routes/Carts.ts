import { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module
import Cart, { ICartSchemaType } from "../models/Cart";
import {
    verifyAdminToken,
    verifyAuthorizationToken,
    verifyToken,
} from "../utils/tokenHelpers";

const router = Router();

// *######################################################################
// *Creating Carts API endpoints and implementing Carts CRUD operations :-
// *######################################################################

// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get all carts from the db only admins can access all the carts
router.get("/", verifyAdminToken, async (req: Request, res: Response) => {
    try {
        // *READ OPERATION
        // get all carts from the db as an arr
        const allFetchedCartsArr: ICartSchemaType[] = await Cart.find();
        // send all the fetched carts as an array and the ok status code
        // 200 status code means OK
        return res.status(200).json(allFetchedCartsArr);
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get only one cart from the db based on the user (userId) to whom the cart belong
router.get(
    "/:userId",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *READ OPERATION
            // get only one cart from the db based on the user (user id) to whom the cart belong
            // the userId field here is a foreign key.
            const fetchedCartFromDB: ICartSchemaType = await Cart.findOne({
                userId: req.params.userId,
            });
            // send the fetched Order From DB info and the ok status code
            // 200 status code means OK
            return res.status(200).json(fetchedCartFromDB);
        } catch (error) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(error);
        }
    }
);

// *POST HTTP REQUEST METHOD
// *CREATE OPERATION
// create a new cart. Any user can create a new cart.
router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const newCart: any = new Cart(req.body);
        // *CREATE OPERATION
        // create a new cart.
        const savedNewCart: ICartSchemaType = await newCart.save();
        // send the newly added cart info and the ok status code
        // 200 status code means OK
        return res.status(200).json(savedNewCart);
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

// *DELETE HTTP REQUEST METHOD
// *DELETE OPERATION
// only admins can delete a cart by id
router.delete(
    "/:id",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *DELETE OPERATION
            await Cart.findByIdAndDelete(req.params.id);

            // send a success message and the ok status code
            // 200 status code means OK
            return res.status(200).json("successfully deleted cart");
        } catch (error) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(error);
        }
    }
);

// *PUT HTTP REQUEST METHOD
// *UPDATE OPERATION
// only admins can update a cart by id
router.put(
    "/:id",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *UPDATE OPERATION
            const updatedCart: ICartSchemaType = await Cart.findByIdAndUpdate(
                req.params.id,
                // $set: req.body to reassign the whole database document based on the request body
                {
                    $set: req.body,
                },
                { new: true } // to return the updated cart
            );
            // send the updated cart and the ok status code
            // 200 status code means OK
            return res.status(200).json(updatedCart);
        } catch (error) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(error);
        }
    }
);

export { router };
