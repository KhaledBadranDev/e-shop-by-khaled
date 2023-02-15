import { FC } from "react";
import styled from "styled-components";
import {
    BrowserRouter as RouterDom,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Users from "./pages/users/Users";
import User from "./pages/users/User";
import NewUser from "./pages/users/NewUser";
import Products from "./pages/products/Products";
import Product from "./pages/products/Product";
import NewProduct from "./pages/products/NewProduct";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import { IReduxRootStateType } from "./redux/store";
import { IReduxAdminStateType } from "./redux/admin";

const App: FC = () => {
    const currentAdminRedux: IReduxAdminStateType = useSelector<
        IReduxRootStateType,
        IReduxAdminStateType
    >((state: any) => state.admin.username);

    return (
        <RouterDom>
            <Topbar />
            <Container>
                {/* hide the sidebar if the admin is not signed in */}
                {currentAdminRedux && <Sidebar />}
                {/* if the admin is not signed in then always display the sign in page 
                    regardless of the url */}
                {!currentAdminRedux && (
                    <Routes>
                        <Route
                            path="*"
                            element={
                                currentAdminRedux ? (
                                    <Navigate to="/" />
                                ) : (
                                    <SignIn />
                                )
                            }
                        />
                    </Routes>
                )}
                {currentAdminRedux && (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/user/:userId" element={<User />} />
                        <Route path="/newuser" element={<NewUser />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/product/:productId"
                            element={<Product />}
                        />
                        <Route path="/newproduct" element={<NewProduct />} />
                    </Routes>
                )}
                {console.log("currentAdminRedux:", currentAdminRedux)}
            </Container>
        </RouterDom>
    );
};

export default App;

const Container = styled.div`
    display: flex;
`;
