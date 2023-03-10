import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Category } from "../data/categories";
import { mobile } from "../utils/styleResponsive";

const CategoryCard: FC<Category> = (categoryElement) => {
    // categoryElement is an element from the arr that has all the catagories data

    return (
        <Container>
            <Image src={categoryElement.imgReference} />
            <Info>
                <Title>{categoryElement.title}</Title>
                <Link to={`/categories/${categoryElement.categoryName}`}>
                    <Button>SHOP NOW</Button>
                </Link>
            </Info>
        </Container>
    );
};

export default CategoryCard;

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`;
