import { Router, Request, Response } from "express"; // Request and Response are interfaces from the express module
import Product, { IProductSchemaType } from "../models/Product";
import { verifyAdminToken } from "../utils/tokenHelpers";

const router = Router();

// *###########################################################################
// *Creating Products API endpoints and implementing Product CRUD operations :-
// *###########################################################################

// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get all products from the db
router.get("/", async (req: Request, res: Response) => {
    try {
        const queryParamCategory: string | any = req.query.category;
        // if we need to filter products by category 
        // the http method would somehow as follows:
        // http://localhost:5000/api/products?category=men
        // otherwise to tech all of the products:
        // http://localhost:5000/api/products
        const queryParamLimit: string | any = req.query.limit; // similarly limit how many products should be fetched
        // http://localhost:5000/api/products?limit=10


        // *READ OPERATION
        // get products from the db as an arr
        let allProductsArr: IProductSchemaType[]
        if (queryParamCategory) allProductsArr = await Product.find({
            categories:{
                $in:[queryParamCategory]
            }
        });
        else if(queryParamLimit)allProductsArr = await Product.find().limit(queryParamLimit);
        else allProductsArr = await Product.find();

        return res.status(200).json(allProductsArr);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// *GET HTTP REQUEST METHOD
// *READ OPERATION
// get only one product from the db by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        // *READ OPERATION
        // get only one product from the db by id
        const fetchedProductFromDb: IProductSchemaType = await Product.findById(req.params.id);
        return res.status(200).json(fetchedProductFromDb);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// *POST HTTP REQUEST METHOD
// *CREATE OPERATION
// only admins can add new products
router.post("/", verifyAdminToken, async (req: Request, res: Response) => {
    try {
        // By doing this, the TypeScript compiler will check
        // that the req.body object has the properties
        // and types defined in the IUserSchemaType interface,
        // and will raise an error if it doesn't match.
        const reqBody: IProductSchemaType = req.body as IProductSchemaType;
        const newProduct = new Product(reqBody);
        // *CREATE OPERATION
        const savedNewProduct: IProductSchemaType = await newProduct.save(); // to save/add the product to db
        // send the newly added Product info and the ok status code
        // 200 status code means OK
        return res.status(200).json(savedNewProduct);
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

// *DELETE HTTP REQUEST METHOD
// *DELETE OPERATION
// only admins can delete a product by id
router.delete("/:id", verifyAdminToken, async (req: Request, res: Response) => {
    try {
        // *DELETE OPERATION
        await Product.findByIdAndDelete(req.params.id);
        // send a success message and the ok status code
        // 200 status code means OK
        return res.status(200).json("successfully deleted product");
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

// *PUT HTTP REQUEST METHOD
// *UPDATE OPERATION
// only admins can update a product by id
router.put("/:id", verifyAdminToken, async (req: Request, res: Response) => {
    try {
        // *UPDATE OPERATION
        const updatedProduct: IProductSchemaType =
            await Product.findByIdAndUpdate(
                req.params.id,
                // $set: req.body to reassign the whole database document based on the request body
                {
                    $set: req.body,
                },
                { new: true } // to return the updated product
            );
        // send the updated product and the ok status code
        // 200 status code means OK
        return res.status(200).json(updatedProduct);
    } catch (error) {
        // send the error and the status code
        // 500 status code means Internal Server Error
        return res.status(500).json(error);
    }
});

export { router };
