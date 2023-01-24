import { FC } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";

const App: FC = () => {
    // return <Home />;
    return (
        <div>
            <AnnouncementBar
                announcement={
                    "NEW YEAR DEAL: 10% OFF EVERYTHING + FREE SHIPPING"
                }
            />
            <Navbar />

            {/* <Home/> */}
            {/* <Cart />; */}
            {/* <Category />; */}
            {/* <Product /> */}
            <SignUp />
            <SignIn />

            <Footer />
        </div>
    );
};

export default App;
