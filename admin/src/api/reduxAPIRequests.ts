import {
    signIn,
    signInSucceeded,
    signInFailed,
    IReduxAdminActionPayloadTypes,
} from "../redux/admin";

import * as reduxProducts from "../redux/products";

import { axiosPublicRequest, axiosAuthAdminRequest } from "./requestMethods";

const reduxSignInAsyncAPICallHelper = async (
    dispatch: (arg0: {
        payload: IReduxAdminActionPayloadTypes | undefined;
        type: "admin/signIn" | "admin/signInSucceeded" | "admin/signInFailed";
    }) => void,
    admin: any
) => {
    dispatch(signIn());
    try {
        const relativePath = "/auth/admin/signin";
        const method = "POST";
        const bodyContent = admin;

        const fetchedAdminDataFromDB: any = await axiosPublicRequest(
            relativePath,
            method,
            bodyContent
        );
        const adminDataForAxios: IReduxAdminActionPayloadTypes = {
            email: fetchedAdminDataFromDB.email,
            username: fetchedAdminDataFromDB.username,
            password: fetchedAdminDataFromDB.password,
            error: "",
        };
        dispatch(signInSucceeded(adminDataForAxios));
    } catch (error: any) {
        const errorState: IReduxAdminActionPayloadTypes = {
            email: "",
            username: "",
            password: "",
            error: `${error.message}. ${error.response.data}. ${error.response.statusText}`,
        };
        console.log(error);
        dispatch(signInFailed(errorState));
    }
};

const postReduxProduct = async (
    product: reduxProducts.IProductSchemaType,
    dispatch: (arg0: {
        payload: reduxProducts.IReduxProductsActionPayloadType | undefined;
        type:
            | "products/postProductsStarted"
            | "products/postProductsSucceeded"
            | "products/postProductsFailed";
    }) => void
) => {
    dispatch(reduxProducts.postProductsStarted());
    try {
        const relativePath: string = "/products";
        const method: string = "POST";
        const bodyContent = product;

        //* CREATE DATABASE OPERATION
        //* POST HTTP METHOD
        const addedProduct: any = await axiosAuthAdminRequest(
            relativePath,
            method,
            bodyContent
        );

        const ReduxActionPayload: reduxProducts.IReduxProductsActionPayloadType =
            {
                product: addedProduct,
            };
        dispatch(reduxProducts.postProductsSucceeded(ReduxActionPayload));
    } catch (error: any) {
        const errorState: reduxProducts.IReduxProductsStateType = {
            products: [],
            isAsyncAwait: false,
            error: `${error.message}. ${error.response.data}. ${error.response.statusText}`,
        };
        dispatch(reduxProducts.postProductsFailed(errorState));
    }
};

const getReduxProducts = async (
    dispatch: (arg0: {
        payload: reduxProducts.IReduxProductsActionPayloadType | undefined;
        type:
            | "products/getProductsStarted"
            | "products/getProductsSucceeded"
            | "products/getProductsFailed";
    }) => void
) => {
    dispatch(reduxProducts.getProductsStarted());
    try {
        const relativePath: string = "/products";
        const method: string = "GET";

        //* READ DATABASE OPERATION
        //* GET HTTP METHOD
        const fetchedProducts: any = await axiosPublicRequest(
            relativePath,
            method
        );

        const ReduxActionPayload: reduxProducts.IReduxProductsActionPayloadType =
            {
                products: fetchedProducts,
            };
        dispatch(reduxProducts.getProductsSucceeded(ReduxActionPayload));
    } catch (error: any) {
        const errorState: reduxProducts.IReduxProductsStateType = {
            products: [],
            isAsyncAwait: false,
            error: `${error.message}. ${error.response.data}. ${error.response.statusText}`,
        };
        dispatch(reduxProducts.getProductsFailed(errorState));
    }
};

const updateReduxProduct = async (
    _id: string,
    dispatch: (arg0: {
        payload: reduxProducts.IReduxProductsActionPayloadType | undefined;
        type:
            | "products/putProductsStarted"
            | "products/putProductsSucceeded"
            | "products/putProductsFailed";
    }) => void
) => {
    dispatch(reduxProducts.putProductsStarted());
    try {
        const relativePath: string = `/products/${_id}`;
        const method: string = "PUT";

        //* UPDATE DATABASE OPERATION
        //* PUT HTTP METHOD
        const fetchedUpdatedProduct: any = await axiosAuthAdminRequest(
            relativePath,
            method
        );

        const ReduxActionPayload: reduxProducts.IReduxProductsActionPayloadType =
            {
                _id: _id,
                product: fetchedUpdatedProduct,
            };
        dispatch(reduxProducts.putProductsSucceeded(ReduxActionPayload));
    } catch (error: any) {
        const errorState: reduxProducts.IReduxProductsStateType = {
            products: [],
            isAsyncAwait: false,
            error: `${error.message}. ${error.response.data}. ${error.response.statusText}`,
        };
        dispatch(reduxProducts.putProductsFailed(errorState));
    }
};

const deleteReduxProduct = async (
    _id: string,
    dispatch: (arg0: {
        payload: reduxProducts.IReduxProductsActionPayloadType | undefined;
        type:
            | "products/deleteProductsStarted"
            | "products/deleteProductsSucceeded"
            | "products/deleteProductsFailed";
    }) => void
) => {
    dispatch(reduxProducts.deleteProductsStarted());
    try {
        console.log(_id)
        const relativePath: string = `/products/${_id}`;
        const method: string = "DELETE";

        //* DELETE DATABASE OPERATION
        //* DELETE HTTP METHOD
        await axiosAuthAdminRequest(relativePath, method);

        const ReduxActionPayload: reduxProducts.IReduxProductsActionPayloadType =
            {
                _id: _id,
            };
        dispatch(reduxProducts.deleteProductsSucceeded(ReduxActionPayload));
    } catch (error: any) {
        const errorState: reduxProducts.IReduxProductsStateType = {
            products: [],
            isAsyncAwait: false,
            error: `${error.message}. ${error.response.data}. ${error.response.statusText}`,
        };
        dispatch(reduxProducts.deleteProductsFailed(errorState));
    }
};

export default reduxSignInAsyncAPICallHelper;
export {
    postReduxProduct,
    getReduxProducts,
    updateReduxProduct,
    deleteReduxProduct,
};
