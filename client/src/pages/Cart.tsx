import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { FC } from "react";
import styled from "styled-components";
import { mobile } from "../utils/styleResponsive";
import { useSelector } from "react-redux";
import { IReduxCartStateType, IReduxCartProductType } from "../redux/cart";
import { IReduxRootStateType } from "../redux/store";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { axiosPublicRequest } from "../api/requestMethods";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const Cart: FC = () => {
    const cartRedux: IReduxCartStateType = useSelector<
        IReduxRootStateType,
        IReduxCartStateType
    >((state: any) => state.cart);

    const onTokenStripe = (token: any) => {
        const test = async () => {
            try {
                // get all the important order details
                // and send them as description a long with the payment details
                const orderDetails = cartRedux.cartProducts.map(
                    (cartProduct: IReduxCartProductType) => ({
                        title: cartProduct.product.title,
                        _id: cartProduct.product._id,
                        productQuantity: cartProduct.productQuantity,
                        color: cartProduct.color,
                        size: cartProduct.size,
                    })
                );
                // note: price has to be multiplied by 100 to convert from cents to dollars as the by default stripe uses cents
                const relativePath = "/stripe/checkout";
                const method = "POST";
                const bodyContent = JSON.stringify({
                    tokenId: token.id,
                    price: cartRedux.totalPrice * 100,
                    description: JSON.stringify(orderDetails),
                });

                await axiosPublicRequest(relativePath, method, bodyContent);
                alert("Your order has been successfully received.");
            } catch (error) {
                alert("FAILED: you ordered couldn't be completed!\n" + error);
            }
        };
        test();
    };

    return (
        <Container>
            <Wrapper>
                <Title>YOUR SHOPPING BASKET</Title>
                <Top>
                    <Link to="/">
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cartRedux.cartProducts.map((reduxCartProduct) => (
                            <Product key={reduxCartProduct.product._id}>
                                <ProductDetail>
                                    <Image
                                        src={
                                            reduxCartProduct.product
                                                .imgReference
                                        }
                                    />
                                    <Details>
                                        <ProductName>
                                            <>
                                                <b>Product: </b>
                                                {`${reduxCartProduct.product.title}`}
                                            </>
                                        </ProductName>
                                        <ProductId>
                                            <>
                                                <b>ID: </b>
                                                {`${reduxCartProduct.product._id}`}
                                            </>
                                        </ProductId>
                                        <ProductColorWrapper>
                                            <>
                                                <b>color: </b>
                                                <ProductColor
                                                    color={
                                                        reduxCartProduct.color
                                                    }
                                                />
                                            </>
                                        </ProductColorWrapper>
                                        <ProductSize>
                                            <>
                                                <b>Size: </b>
                                                {`${reduxCartProduct.size}`}
                                            </>
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <FaPlusCircle />
                                        <ProductAmount>
                                            {reduxCartProduct.productQuantity}
                                        </ProductAmount>
                                        <FaMinusCircle />
                                    </ProductAmountContainer>
                                    {/* the total price of each product = price for each * quantity for each  */}
                                    <ProductPrice>
                                        $
                                        {reduxCartProduct.product.price *
                                            reduxCartProduct.productQuantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>
                                $ {cartRedux.totalPrice}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Estimated Shipping
                            </SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>
                                $ {cartRedux.totalPrice}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            token={onTokenStripe}
                            stripeKey={STRIPE_PUBLIC_KEY}
                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            name="E Shop - By Khaled"
                            description={`Your total is $${cartRedux.totalPrice}`}
                            amount={cartRedux.totalPrice * 100}
                            // *100 to convert from cents to dollars as the by default stripe uses cents
                            billingAddress
                            shippingAddress
                            allowRememberMe
                            ComponentClass={"as"}
                            currency="CAD"
                            panelLabel="Pay Now"
                            Label="test label"
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    );
};

export default Cart;

interface IStyledCompPropsTypes {
    type?: string;
    bgColor?: string;
}

const Container = styled.div`
    padding: 30px 0px;
    background-color: white;
`;

const ProductColorWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ProductColor = styled.div<IStyledCompPropsTypes>`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid lightgray;

    /* border-style: solid; */
    box-shadow: 0 1.5px 1.5px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-width: 1.7px;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
`;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button<IStyledCompPropsTypes>`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    border: 0.5px solid lightgray;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div<IStyledCompPropsTypes>`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;
