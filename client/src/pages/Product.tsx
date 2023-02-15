import { FC, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import { mobile } from "../utils/styleResponsive";
import { IProductTypes } from "../data/popularProducts";
import { axiosPublicRequest } from "../api/requestMethods";
import { useDispatch } from "react-redux";
import { addProductToCart, IReduxCartActionPayloadTypes } from "../redux/cart";

const Product: FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<
        IProductTypes | undefined
    >(undefined);
    const [itemQuantity, setItemQuantity] = useState<number>(1);
    const [itemColor, setItemColor] = useState<string>("");
    const [itemSize, setItemSize] = useState<string>("");
    const cartStateDispatch = useDispatch();

    // the most relevant field here is the pathname. Hence the Pick<Location, 'pathname'>
    const productLocation: Pick<Location, "pathname"> = useLocation();
    // productLocation looks somehow as follows:
    // {hash: "";
    // key: "007u9gsu";
    // pathname: "/products/ui21jkij2ij";
    // search: "";
    // state: null;}
    // the second element of the pathname field is important here
    const productId: string = productLocation.pathname.split("/")[2]; //.../.../..hereIsImportant..

    // using arrow functions or binding in tSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies.
    const handelSetItemQuantity = useCallback(
        (type: string) => {
            if (type === "plus") {
                setItemQuantity(itemQuantity + 1);
            } else if (type === "minus" && itemQuantity > 1) {
                setItemQuantity(itemQuantity - 1);
            }
        },
        [itemQuantity]
    );
    const handelSetItemColor = useCallback(
        (color: string) => {
            setItemColor(color);
        },
        [itemColor]
    );
    const handelSetItemSize = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setItemSize(event.target.value);
        },
        [itemSize]
    );

    const handelAddToCart = useCallback(() => {
        if (selectedProduct) {
            const productTobeAddedToCart: IReduxCartActionPayloadTypes = {
                product: { ...selectedProduct },
                productQuantity: itemQuantity,
                color: itemColor,
                size: itemSize,
            };
            cartStateDispatch(addProductToCart(productTobeAddedToCart));
        }
    }, [itemQuantity, itemColor, itemSize]);

    // to fetch data from database when the category change and on first render
    useEffect(() => {
        // fetch data from database
        const getProduct = async () => {
            try {
                let relativePath = `/products/${productId}`;
                const method = "GET";
                const productFromDB: any = await axiosPublicRequest(
                    relativePath,
                    method
                );
                setSelectedProduct(productFromDB);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, [productId]);

    return (
        <Container>
            {selectedProduct !== undefined && (
                <Wrapper>
                    <ImgContainer>
                        <Image src={selectedProduct.imgReference} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{selectedProduct.title}</Title>
                        <Description>{selectedProduct.description}</Description>
                        <Price>${selectedProduct.price}</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterTitle>Colors</FilterTitle>
                                {/* create a color option for every available color */}

                                {selectedProduct.colors.map(
                                    (eachColor: string) => (
                                        <FilterColor
                                            color={eachColor}
                                            key={eachColor}
                                            onClick={() =>
                                                handelSetItemColor(eachColor)
                                            }
                                        />
                                    )
                                )}
                            </Filter>
                            <Filter>
                                <FilterTitle>Size</FilterTitle>
                                <FilterSize onChange={handelSetItemSize}>
                                    {/* create a list option for every available size */}
                                    {selectedProduct.sizes.map(
                                        (eachSize: string) => (
                                            <FilterSizeOption
                                                key={eachSize}
                                                value={eachSize}
                                            >
                                                {eachSize.toUpperCase()}
                                            </FilterSizeOption>
                                        )
                                    )}
                                </FilterSize>
                            </Filter>
                        </FilterContainer>
                        <AddContainer>
                            <AmountContainer>
                                <FaPlusCircle
                                    onClick={() =>
                                        handelSetItemQuantity("plus")
                                    }
                                />
                                <Amount>{itemQuantity}</Amount>
                                <FaMinusCircle
                                    onClick={() =>
                                        handelSetItemQuantity("minus")
                                    }
                                />
                            </AmountContainer>
                            <Button onClick={handelAddToCart}>
                                ADD TO CART
                            </Button>
                        </AddContainer>
                    </InfoContainer>
                </Wrapper>
            )}
            <Newsletter />
        </Container>
    );
};

export default Product;

const Container = styled.div`
    padding: 30px 0px;
    background-color: white;
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid lightgray;
    box-shadow: 0 1.5px 1.5px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-width: 1.7px;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #f8f4f4;
    }
`;
