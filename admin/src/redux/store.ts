import { configureStore } from "@reduxjs/toolkit";
import adminReducer, { IReduxAdminStateType } from "./admin";
import productsReducer, { IReduxProductsStateType } from "./products";

// docs for Redux-Persist: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, adminReducer);

// store is a container that holds/stores the global states for the whole application
// it is like a database for the front-end
// a collection of reducers will be passed to the store
// a reducer is a function that takes as parameters
// the current state and an action that has new values/payload
// to assign to the current state, and then return it.

// two main hooks will be used to
// access and to change the value of the states inside the store
// "useDispatch"  to change the value of the global states
// "useSelector"  to select/access the value of the global states
// both are imported from the react-redux package

interface IReduxRootStateType {
    admin: IReduxAdminStateType;
    products: IReduxProductsStateType;
}

// docs for Redux-Persist: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
const store = configureStore({
    reducer: {
        admin: persistedUserReducer,
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

let persistor = persistStore(store);

export default store;
export { persistor };
export type { IReduxRootStateType };
