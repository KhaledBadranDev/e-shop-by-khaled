import { createSlice } from "@reduxjs/toolkit";

interface IProductSchemaType {
    _id: string;
    title: string;
    description: string;
    imgReference: string;
    categories: any;
    sizes: any;
    colors: any;
    price: number;
    isInStock: boolean;
}

interface IReduxProductsActionPayloadType {
    products?: IProductSchemaType[];
    product?: IProductSchemaType;
    _id?: string;
    error?: string;
}

interface IReduxProductsStateType {
    products: IProductSchemaType[];
    isAsyncAwait: boolean;
    error: string;
}

// a slice is an object that has a name, initialState, and reducers functions.
// name is important later on for using the useSelector hook
// initialState is somehow the structure/schema for this slice/model
// a reducer is a function that takes as parameters
// the current state and an action that has new values/payload
// to assign to the current state, and then return it.

// reducers functions can't be asynchronous
// thus we need to create another redux api helper file
// that will have async functions and dispatch these reducers here
// to update the values

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isAsyncAwait: false,
        error: "",
    } as IReduxProductsStateType,
    reducers: {
        //* ################
        //* CRUD with REDUX:
        //* ################

        //* CREATE Operations / POST Methods
        postProductsStarted: (state) => {
            state.isAsyncAwait = true;
            state.products = [];
            state.error = "";
        },
        postProductsSucceeded: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload.product)
                state.products.push(action.payload.product);
            state.isAsyncAwait = false;
            state.error = "";
        },
        postProductsFailed: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload.error) state.error = action.payload.error;
            state.isAsyncAwait = false;
            state.products = [];
        },

        //* READ Operations / GET Methods
        getProductsStarted: (state) => {
            state.isAsyncAwait = true;
            state.products = [];
            state.error = "";
        },
        getProductsSucceeded: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload.products)
                state.products = action.payload.products;
            state.isAsyncAwait = false;
            state.error = "";
        },
        getProductsFailed: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload.error) state.error = action.payload.error;
            state.isAsyncAwait = false;
            state.products = [];
        },

        //* UPDATE Operations / PUT Methods
        putProductsStarted: (state) => {
            state.isAsyncAwait = true;
            state.products = [];
            state.error = "";
        },
        putProductsSucceeded: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload._id && action.payload.product) {
                state.products[
                    state.products.findIndex(
                        (oldProduct: IProductSchemaType) =>
                            oldProduct._id === action.payload._id
                    )
                ] = action.payload.product;
            }
            state.isAsyncAwait = false;
            state.error = "";
        },
        putProductsFailed: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload.error) state.error = action.payload.error;
            state.isAsyncAwait = false;
            state.products = [];
        },

        //* DELETE Operations / DELETE Methods
        deleteProductsStarted: (state) => {
            state.isAsyncAwait = true;
            state.products = [];
            state.error = "";
        },
        deleteProductsSucceeded: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload._id) {
                state.products.splice(
                    state.products.findIndex(
                        (productToBeDeleted) =>
                            productToBeDeleted._id === action.payload._id
                    ),
                    1
                );
            }
            state.isAsyncAwait = false;
            state.error = "";
        },
        deleteProductsFailed: (
            state,
            action: { payload: IReduxProductsActionPayloadType }
        ) => {
            if (action.payload.error) state.error = action.payload.error;
            state.isAsyncAwait = false;
            state.products = [];
        },
    },
});

export default productsSlice.reducer;
export const {
    postProductsStarted,
    postProductsSucceeded,
    postProductsFailed,
    getProductsStarted,
    getProductsSucceeded,
    getProductsFailed,
    putProductsStarted,
    putProductsSucceeded,
    putProductsFailed,
    deleteProductsStarted,
    deleteProductsSucceeded,
    deleteProductsFailed,
} = productsSlice.actions;
export type { IReduxProductsActionPayloadType, IReduxProductsStateType, IProductSchemaType};
