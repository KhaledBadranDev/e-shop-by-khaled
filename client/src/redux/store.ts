import {
    configureStore,
    combineReducers,
    Reducer,
    CombinedState,
} from "@reduxjs/toolkit";
import cartReducer, { IReduxCartStateType } from "./cart";
import userReducer, { IReduxUserStateType } from "./user";

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

interface IReduxRootStateType {
    cart: IReduxCartStateType;
    user: IReduxUserStateType;
}

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// combine the user and cart global states
const rootCombinedReducers: Reducer<CombinedState<IReduxRootStateType>> =
    combineReducers({ cart: cartReducer, user: userReducer });
// the persisted combined user and cart global states
const persistedCombinedReducer = persistReducer(persistConfig, rootCombinedReducers);

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

// docs for Redux-Persist: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
const store = configureStore({
    reducer: persistedCombinedReducer,
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
