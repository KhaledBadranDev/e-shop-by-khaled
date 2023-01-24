import { FC } from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SliderBanner from "../components/SliderBanner";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const Home: FC = () => {
    return (
        <div>
            <SliderBanner />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
