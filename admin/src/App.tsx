import { FC } from "react";
import styled from "styled-components";
import { BrowserRouter as RouterDom, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Users from "./pages/users/Users";
import User from "./pages/users/User";
import NewUser from "./pages/users/NewUser";
import Products from "./pages/products/Products";
import Product from "./pages/products/Product";
import NewProduct from "./pages/products/NewProduct";

const App: FC = () => {
    return (
        <RouterDom>
            <Topbar />
            <Container>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/user/:userId" element={<User />} />
                    <Route path="/newuser" element={<NewUser />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/newproduct" element={<NewProduct />} />
                </Routes>
            </Container>
        </RouterDom>
    );
};

export default App;

const Container = styled.div`
    display: flex;
`;
