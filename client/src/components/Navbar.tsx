import { FC } from "react";
import styled from "styled-components";
import { mobile } from "../util/styleResponsive";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";

const Navbar: FC = () => {
    return (
        <Container>
            <Wrapper>
                <FirstThird>
                    <Logo>E Shop - By Khaled</Logo>
                </FirstThird>
                <SecondThird>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <FaSearch
                            style={{
                                color: "gray",
                                fontSize: 16,
                            }}
                        />
                    </SearchContainer>
                </SecondThird>
                <LastThird>
                    <MenuItem>Sign Up</MenuItem>
                    <MenuItem>Sign In</MenuItem>
                    <ShoppingBasket>
                        <FaShoppingBasket
                            style={{ color: "gray", fontSize: 24 }}
                        />
                        <ShoppingBasketBadge>3</ShoppingBasketBadge>
                    </ShoppingBasket>
                </LastThird>
            </Wrapper>
        </Container>
    );
};

export default Navbar;

const Container = styled.div`
    height: 50px;
    background-color: #09152c;
    color: white;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const FirstThird = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const SecondThird = styled.div`
    flex: 1;
    text-align: center;
`;

const LastThird = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    color: white;
    background-color: gray;
    ${mobile({ width: "50px" })}
`;

const Logo = styled.h1`
    font-weight: bold;
    font-size: 18px;
    ${mobile({ fontSize: "16px" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const ShoppingBasket = styled.div`
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const ShoppingBasketBadge = styled.div`
    border-radius: 50%;
    background-color: #06b6d4;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-weight: bold;
    width: 1rem;
    height: 1rem;
    position: relative;
    top: -1rem;
    right: 1.5rem;
    transform: translate(25%, 25%);
`;
