import { FC } from "react";
import popularProducts, { Product } from "../data/popularProducts";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Products: FC = () => {
    return (
        <Container>
            {popularProducts.map((ProductElement: Product) => (
                <ProductCard
                    id={ProductElement.id}
                    imgReference={ProductElement.imgReference}
                />
            ))}
        </Container>
    );
};

export default Products;

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
