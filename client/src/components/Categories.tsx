import { FC } from "react";
import styled from "styled-components";
import categories, { Category } from "../data/categories";
import { mobile } from "../utils/styleResponsive";
import CategoryCard from "./CategoryCard";

const CategoriesCards: FC = () => {
    return (
        <Container>
            {categories.map((categoryElement: Category) => (
                <CategoryCard
                    key={categoryElement.id}
                    imgReference={categoryElement.imgReference}
                    id={categoryElement.id}
                    title={categoryElement.title}
                    categoryName={categoryElement.categoryName}
                />
            ))}
        </Container>
    );
};

export default CategoriesCards;

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })}
`;
