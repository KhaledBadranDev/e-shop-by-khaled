import { createSlice, current } from "@reduxjs/toolkit";
import { IProductTypes } from "../data/popularProducts";
import { isDeepEqual } from "../utils/helpers";
// a slice is an object that has a name, initialState, and reducers functions.
// name is important later on for using the useSelector hook
// initialState is somehow the structure/schema for this slice/model
// a reducer is a function that takes as parameters
// the current state and an action that has new values/payload
// to assign to the current state, and then return it.

interface IReduxCartActionPayloadTypes {
    product: IProductTypes;
    productQuantity: number;
    color: string;
    size: string;
}

interface IReduxCartProductType {
    product: IProductTypes;
    productQuantity: number;
    color: string;
    size: string;
}

interface IReduxCartStateType {
    cartProducts: IReduxCartProductType[];
    totalProductsQuantity: number;
    totalPrice: number;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [] as IReduxCartProductType[],
        totalProductsQuantity: 0 as number,
        totalPrice: 0 as number,
    } as IReduxCartStateType,
    reducers: {
        addProductToCart: (
            state,
            action: { payload: IReduxCartActionPayloadTypes }
        ) => {
            // new product to be added
            const newCartProduct: IReduxCartProductType = {
                product: action.payload.product,
                productQuantity: action.payload.productQuantity,
                color: action.payload.color,
                size: action.payload.size,
            };

            // if the cart is empty then add the product directly
            // without checking for duplicates
            if (current(state["cartProducts"]).length === 0) {
                // new product to be added
                state["cartProducts"].push(newCartProduct);
                state["cartProducts"][0]["productQuantity"] =
                    action.payload.productQuantity;
            } else {
                // iterate over the whole products and
                // check if the product exists already in the cart or not
                let isDuplicate: boolean = false;
                current(state["cartProducts"]).forEach(
                    (cartProduct: IReduxCartProductType) => {
                        // if the product has been already added to the cart
                        // then increase the quantity only the
                        // but don't add/push the product one more time the array
                        // *IMPORTANT: ignore the productQuantity while comparing these objects
                        // because they will be considered as different objects if the quantity is different
                        // meanwhile everything other than this is the same
                        // and for this project/cart: different quantity doesn't mean different products :)
                        const {
                            productQuantity: fieldToBeIgnored1,
                            ...restCartProduct
                        } = cartProduct;
                        const {
                            productQuantity: fieldToBeIgnored2,
                            ...restNewCartProduct
                        } = newCartProduct;
                        const tmpNoQuantityCartProduct = { ...restCartProduct };
                        const tmpNoQuantityNewCartProduct = {
                            ...restNewCartProduct,
                        };
                        if (
                            isDeepEqual(
                                tmpNoQuantityCartProduct,
                                tmpNoQuantityNewCartProduct
                            )
                        ) {
                            isDuplicate = true;
                            let updatedCartProduct = { ...cartProduct };
                            // we can't modify the current product directly
                            // we will get the following bug
                            // Cannot assign to read only property 'productQuantity' of object '#<Object>'
                            // thus clone the current cartProduct and then update the quantity.
                            // then remove the old one and the replace/swap it with the new one.

                            updatedCartProduct["productQuantity"] +=
                                newCartProduct.productQuantity;
                            state["cartProducts"] = state["cartProducts"].map(
                                (item: IReduxCartProductType) => {
                                    return isDeepEqual(item, cartProduct)
                                        ? updatedCartProduct
                                        : item;
                                }
                            );
                        }
                    }
                );

                // if the product doesn't exist in the cart
                // then add/push the product to the array
                // and increase the quantity
                if (!isDuplicate) {
                    state["cartProducts"].push(newCartProduct);
                }
            }

            // now update the totalProductsQuantity and totalPrice fields
            // but firstly reset the values
            state["totalProductsQuantity"] = 0;
            state["totalPrice"] = 0;
            state["cartProducts"].forEach((cartProduct) => {
                state["totalProductsQuantity"] +=
                    cartProduct["productQuantity"]; // update totalProductsQuantity
                state["totalPrice"] +=
                    cartProduct["productQuantity"] *
                    cartProduct["product"]["price"]; // update totalPrice
            });
        },
    },
});

export default cartSlice.reducer;

export const { addProductToCart } = cartSlice.actions;
export type { IReduxCartActionPayloadTypes, IReduxCartProductType, IReduxCartStateType };
