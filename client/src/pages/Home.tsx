import { FC } from "react";
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
        </div>
    );
};

export default Home;
