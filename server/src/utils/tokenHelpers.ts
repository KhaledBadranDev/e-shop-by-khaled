import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"; // Request and Response are interfaces from the express module

// *LOCAL helper function
// verify that the access token is valid 
// If it is valid, add the successfully generated result object as a field to the response object 
// so that we can access the API endpoints that requires a token 
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const requestHeadersToken: string | string[] = req.headers.token as string;
    if (requestHeadersToken) {
        // get the second element of the header
        // because the token field from the headers looks somehow as follows:
        // Bearer ..someAccessToken..
        // so the second element is the access token and it is what we need.
        const accessToken: string = requestHeadersToken.split(" ")[1];
        jwt.verify(
            accessToken,
            process.env.JWT_SECRET_KEY,
            (err: unknown, verifiedUserRes: any) => {
                // that is a callback function as a parameter
                // 403 Forbidden
                if (err) res.status(403).json("Not Valid Access Token");

                // create a new custom property to the request object
                // and assign it to the success result of the callback method of jwt.verify()
                req["verifiedUserRes"] = verifiedUserRes;
                // the req["verifiedUserRes"] looks somehow as follows:
                //  {
                //      id: '63d16bc35e4d....',
                //      isAdmin: false,
                //      iat: 1674679003,
                //      exp: 1675283803
                //  }
                console.log(req["verifiedUserRes"]);
                // Call the next middleware or controller to continue executing the rest of the route
                next();
            }
        );
    } else {
        // send the error and the status code
        // 401 Unauthorized
        return res
            .status(401)
            .json("Unauthorized User: access token was not provided.");
    }
};

// check if the user has a NORMAL OR ADMIN access token. 
// if he has EITHER, he is allowed to access the API endpoint 
const verifyAuthorizationToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    verifyToken(req, res, () => {
        if (
            req["verifiedUserRes"].id === req.params.id ||
            req["verifiedUserRes"].isAdmin
        ) {
            // Call the next middleware or controller to continue executing the rest of the route
            next();
        } else {
            // 403 Forbidden
            res.status(403).json("Not Enough Permissions");
        }
    });
};

// check if the user has an admin access token. 
// ONLY if he has the ADMIN token, he is allowed to access the API endpoint 
const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req["verifiedUserRes"].isAdmin) {
            // Call the next middleware or controller to continue executing the rest of the route
            next();
        } else {
            // send the error and the status code
            // 403 Forbidden
            res.status(403).json("Not Enough Permissions");
        }
    });
};

export { verifyAuthorizationToken, verifyAdminToken };
