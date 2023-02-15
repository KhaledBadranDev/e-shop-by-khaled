import { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module
import Order, { IOrderSchemaType } from "../models/Order";
import {
    verifyAdminToken,
    verifyAuthorizationToken,
    verifyToken,
} from "../utils/tokenHelpers";

const router = Router();

// *########################################################################
// *Creating Orders API endpoints and implementing Orders CRUD operations :-
// *########################################################################

// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get all orders from the db only admins can access all the orders
router.get("/", verifyAdminToken, async (req: Request, res: Response) => {
    try {
        // *READ OPERATION
        // get all orders from the db as an arr
        const allFetchedCartsArr: IOrderSchemaType[] = await Order.find();
        // send all the fetched orders as an array and the ok status code
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
// generate revenue statistics based on sales last month and the month before last month
// only admins can access this confidential piece of information
router.get(
    "/revenue",
    verifyAdminToken,
    async (req: Request, res: Response) => {
        try {
            const currentDate: Date = new Date(); 
            const lastYear = new Date(
                new Date().setFullYear(currentDate.getFullYear() - 1)
            );
            let lastMonth: Date;
            let monthBeforeLastMonth: Date;
            
            // if we are in January then the previous 2 months are in the previous year
            if (currentDate.getMonth() === 0) {
                lastMonth = new Date(
                    new Date().setMonth(lastYear.getMonth() - 1)
                );
                monthBeforeLastMonth = new Date(
                    new Date().setMonth(lastYear.getMonth() - 2)
                );
            }
            // if we are in February then the month before last month is in the previous year
            else if (currentDate.getMonth() === 1) {
                lastMonth = new Date(
                    new Date().setMonth(currentDate.getMonth() - 1)
                );
                monthBeforeLastMonth = new Date(
                    new Date().setMonth(lastYear.getMonth() - 1)
                );
            }
            // Otherwise just decrease the month
            else {
                lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
                monthBeforeLastMonth = new Date(
                    new Date().setMonth(lastMonth.getMonth() - 1)
                );
            }

            // gte: greater than equal
            const revenueData: any = await Order.aggregate([
                { $match: { createdAt: { $gte: monthBeforeLastMonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                        sales: "$price",
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
                        total: { $sum: "$sales" },
                    },
                },
            ]);
            return res.status(200).json(revenueData);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
);

// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get order/s from the db based on the user (userId) to whom the order belong
router.get(
    "/:userId",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *READ OPERATION
            // get only one order from the db based on the user (user id) to whom the order belong
            // the userId field here is a foreign key.
            const fetchedOrderFromDB: unknown = await Order.find({
                userId: req.params.userId,
            });
            // send the fetched Order From DB info and the ok status code
            // 200 status code means OK
            return res.status(200).json(fetchedOrderFromDB);
        } catch (error) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(error);
        }
    }
);

// *POST HTTP REQUEST METHOD
// *CREATE OPERATION
// create a new order. Any user can create a new order.
router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const newOrder: any = new Order(req.body);
        // *CREATE OPERATION
        // create a new order.
        const savedNewOrder: IOrderSchemaType = await newOrder.save();
        // send the newly added order info and the ok status code
        // 200 status code means OK
        return res.status(200).json(savedNewOrder);
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

// *DELETE HTTP REQUEST METHOD
// *DELETE OPERATION
// only admins can delete an order by id
router.delete(
    "/:id",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *DELETE OPERATION
            await Order.findByIdAndDelete(req.params.id);

            // send a success message and the ok status code
            // 200 status code means OK
            return res.status(200).json("successfully deleted order");
        } catch (error) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(error);
        }
    }
);

// *PUT HTTP REQUEST METHOD
// *UPDATE OPERATION
// only admins can update an order by id
router.put(
    "/:id",
    verifyAuthorizationToken,
    async (req: Request, res: Response) => {
        try {
            // *UPDATE OPERATION
            const updatedOrder: IOrderSchemaType =
                await Order.findByIdAndUpdate(
                    req.params.id,
                    // $set: req.body to reassign the whole database document based on the request body
                    {
                        $set: req.body,
                    },
                    { new: true } // to return the updated order
                );
            // send the updated order and the ok status code
            // 200 status code means OK
            return res.status(200).json(updatedOrder);
        } catch (error) {
            // send the error and the status code
            // 500 status code means Internal Server Error
            return res.status(500).json(error);
        }
    }
);

export { router };
