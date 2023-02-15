import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import store, { persistor } from "./redux/store";

// docs for Redux-Persist: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

// two main hooks will be used to
// access and to change the value of the states inside the store
// "useDispatch"  to change the value of the global states
// "useSelector"  to select/access the value of the global states
// both are imported from the react-redux package

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/* 
			provide the store (similar to a front-end database) 
			that has the global states to the whole app 
            and the PersistGate is to keep these data persisted 
            even after refreshing the website
		*/}
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
