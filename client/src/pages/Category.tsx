import { FC, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import { mobile } from "../utils/styleResponsive";
import { useLocation } from "react-router-dom";

const Category: FC = () => {
    const [selectedColorValue, setSelectedColorValue] = useState("color");
    const [selectedSizeValue, setSelectedSizeValue] = useState("size");
    const [selectedSortValue, setSelectedSortValue] = useState("sort");

    // the most relevant field here is the pathname. Hence the Pick<Location, 'pathname'>
    const categoryLocation: Pick<Location, "pathname"> = useLocation();
    // categoryLocation looks somehow as follows:
    // {hash: "";
    // key: "007u9gsu";
    // pathname: "/category/someCategoryName";
    // search: "";
    // state: null;}
    // the second element of the pathname field is important here
    const categoryName: string = categoryLocation.pathname.split("/")[2]; //.../.../..hereIsImportant..
    
    // using arrow functions or binding in tSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies.
    const handleSelectColorCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedColorValue(event.target.value),
        [selectedColorValue]
    );

    const handleSelectSizeCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedSizeValue(event.target.value),
        [selectedColorValue]
    );

    const handleSelectSortCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedSortValue(event.target.value),
        [selectedColorValue]
    );

    const handleResetCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedColorValue("color");
            setSelectedSizeValue("size");
            setSelectedSortValue("sort");
        },
        [selectedColorValue, selectedSizeValue, selectedSortValue]
    );

    return (
        <Container>
            <Title>{categoryName.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select
                        value={selectedColorValue}
                        name="color"
                        onChange={handleSelectColorCallback}
                    >
                        <Option value="color">Color</Option>
                        <Option value="white">White</Option>
                        <Option value="black">Black</Option>
                        <Option value="red">Red</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="yellow">Yellow</Option>
                        <Option value="green">Green</Option>
                    </Select>
                    <Select
                        value={selectedSizeValue}
                        name="size"
                        onChange={handleSelectSizeCallback}
                    >
                        <Option value="size">Size</Option>
                        <Option value="xs">XS</Option>
                        <Option value="s">S</Option>
                        <Option value="m">M</Option>
                        <Option value="l">L</Option>
                        <Option value="xl">XL</Option>
                    </Select>
                    <Select
                        value={selectedSortValue}
                        name="sort"
                        onChange={handleSelectSortCallback}
                    >
                        <Option value="sort">Sort</Option>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price: asc</Option>
                        <Option value="desc">Price: desc</Option>
                    </Select>
                    <Button onClick={handleResetCallback}>Reset Filters</Button>
                </Filter>
            </FilterContainer>
            <Products
                categoryName={categoryName}
                colorFilter={selectedColorValue}
                sizeFilter={selectedSizeValue}
                sortFilter={selectedSortValue}
            />
            <Newsletter />
        </Container>
    );
};

export default Category;

const Container = styled.div`
    padding: 30px 0px;
    background-color: white;
`;

const Title = styled.h1`
    margin: 20px;
    display: flex;
    justify-content: center;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: #4b4b4b;
    color: #000000;
    cursor: pointer;
    font-weight: 600;
`;

const Option = styled.option``;
