import { FC } from "react";
import {
    BrowserRouter as RouterDom,
    Routes,
    Route,
    Navigate ,
} from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { IReduxUserStateType } from "./redux/user";
import { useSelector } from "react-redux";
import { IReduxRootStateType } from "./redux/store";

// *###########################################################################
// *Note: the front-end pages routes are different from the api/back-end routes
// *###########################################################################

const App: FC = () => {
    const currentUserRedux: IReduxUserStateType = useSelector<
        IReduxRootStateType,
        IReduxUserStateType
    >((state: any) => state.user.username);

    return (
        <div>
            <AnnouncementBar
                announcement={
                    "NEW YEAR DEAL: 10% OFF EVERYTHING + FREE SHIPPING"
                }
            />
            <RouterDom>
                <Navbar />
                <Routes>
                    {/* /: this means parameter */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/categories/:categoryName"
                        element={<Category />}
                    />
                    <Route
                        path="/signin"
                        element={
                            currentUserRedux ? <Navigate  to="/" /> : <SignIn />
                        }
                    />
                    <Route
                        path="/signup"
                        element={currentUserRedux ? <Navigate  to="/" /> : <SignUp />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/products/:productId" element={<Product />} />
                </Routes>
            </RouterDom>

            <Footer />
        </div>
    );
};

export default App;
