import { Link } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import LabelIcon from "@mui/icons-material/Label";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StoreIcon from "@mui/icons-material/Store";
import { Publish } from "@mui/icons-material";


const Product: FC = () => {
    return (
        <Container>
            <ProductContainer>
                <ProductShow>
                    <ProductShowTop>
                        <ProductShowImg
                            src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt="product image"
                        />
                        <ProductShowTopTitle>
                            <ProductShowProductTitle>
                                Apple Keyboard
                            </ProductShowProductTitle>
                        </ProductShowTopTitle>
                    </ProductShowTop>
                    <ProductShowBottom>
                        <ProductShowTitle>Product Details</ProductShowTitle>
                        <ProductShowInfo>
                            <ProductShowIcon>
                                <LabelIcon />
                            </ProductShowIcon>
                            <ProductShowInfoTitle>
                                Apple Keyboard
                            </ProductShowInfoTitle>
                        </ProductShowInfo>
                        <ProductShowInfo>
                            <ProductShowIcon>
                                <MonetizationOnIcon />
                            </ProductShowIcon>
                            <ProductShowInfoTitle>99</ProductShowInfoTitle>
                        </ProductShowInfo>
                        <ProductShowInfo>
                            <ProductShowIcon>
                                <StoreIcon />
                            </ProductShowIcon>
                            <ProductShowInfoTitle>true</ProductShowInfoTitle>
                        </ProductShowInfo>
                    </ProductShowBottom>
                </ProductShow>
                <ProductUpdate>
                    <ProductUpdateTitle>Update Product</ProductUpdateTitle>
                    <ProductUpdateForm>
                        <ProductUpdateLeft>
                            <ProductUpdateItem>
                                <ProductUpdateLabel>
                                    Product Title
                                </ProductUpdateLabel>
                                <ProductUpdateInput
                                    type="text"
                                    placeholder="Apple Keyboard"
                                />
                            </ProductUpdateItem>

                            <ProductUpdateItem>
                                <ProductUpdateLabel>Price</ProductUpdateLabel>
                                <ProductUpdateInput
                                    type="text"
                                    placeholder="99"
                                />
                            </ProductUpdateItem>
                            <ProductUpdateItem>
                                <ProductUpdateLabel>
                                    Is In Stock?
                                </ProductUpdateLabel>
                                <ProductUpdateInput
                                    type="text"
                                    placeholder="true"
                                />
                            </ProductUpdateItem>
                        </ProductUpdateLeft>
                        <ProductUpdateRight>
                            <ProductUpdateUpload>
                                <ProductUpdateImg
                                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    alt="product updated image"
                                />
                                <ProductUpdateIcon>
                                    <Publish
                                        style={{
                                            color: "#0d6efd",
                                        }}
                                    />
                                </ProductUpdateIcon>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                />
                            </ProductUpdateUpload>
                            <ProductUpdateButton>
                                <SaveAsIcon
                                    style={{
                                        color: "#0d6efd",
                                        marginRight: "5px",
                                    }}
                                />
                                UPDATE PRODUCT
                            </ProductUpdateButton>
                        </ProductUpdateRight>
                    </ProductUpdateForm>
                </ProductUpdate>
            </ProductContainer>
        </Container>
    );
};

export default Product;

const Container = styled.div`
    flex: 5;
    padding: 20px;
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const ProductShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductUpdate = styled.div`
    flex: 2;
    margin-top: 30px;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductShowTop = styled.div`
    display: flex;
    align-items: center;
`;

const ProductShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProductShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const ProductShowProductTitle = styled.div`
    font-weight: 600;
`;

const ProductShowBottom = styled.div`
    margin-top: 20px;
`;

const ProductShowTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;

const ProductShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
`;

const ProductShowIcon = styled.i`
    font-size: 16px !important;
`;

const ProductShowInfoTitle = styled.div`
    margin-left: 10px;
`;

const ProductUpdateTitle = styled.div`
    font-size: 24px;
    font-weight: 600;
`;

const ProductUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const ProductUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const ProductUpdateLabel = styled.label`
    margin-bottom: 2px;
    font-size: 14px;
`;

const ProductUpdateInput = styled.input`
    width: 250px;
    height: 30px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid gray;
    margin-bottom: 15px;
`;

const ProductUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductUpdateLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`;

const ProductUpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;

const ProductUpdateIcon = styled.span`
    cursor: pointer;
`;

const ProductUpdateButton = styled.button`
    border: 2px solid black;
    background-color: transparent;
    padding: 5px 10px;
    font-weight: 600;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
