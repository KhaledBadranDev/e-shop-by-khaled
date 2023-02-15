import { FC, useEffect, useState } from "react";
import popularProducts, { IProductTypes } from "../data/popularProducts";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { axiosPublicRequest } from "../api/requestMethods";

interface IPropsTypes {
    categoryName?: string;
    colorFilter?: string;
    sizeFilter?: string;
    sortFilter?: string;
}

const Products: FC<IPropsTypes> = (IPropsTypes) => {
    const [fetchedProductsFromDB, setFetchedProductsFromDB] = useState([]);
    const [filteredFetchedProducts, setFilteredFetchedProducts] = useState([]);

    // to fetch data from database when the category change and on first render
    useEffect(() => {
        // fetch data from database
        const getProducts = async () => {
            try {
                // adjust the url based on the selected category
                let relativePath = `${
                    IPropsTypes.categoryName
                        ? `/products?category=${IPropsTypes.categoryName}`
                        : "/products"
                }`;
                const method = "GET";

                const productsFromDB: any = await axiosPublicRequest(relativePath,method);
                setFetchedProductsFromDB(productsFromDB);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [IPropsTypes.categoryName]);

    // render on first time and if any of the filters, fetchedProductsFromDB or category changes
    useEffect(() => {
        if (IPropsTypes.categoryName) {
            // check that every project full fills the categoryName and filters conditions
            let filteredProducts: any = fetchedProductsFromDB.filter(
                (eachProduct: IProductTypes) => {
                    return (
                        (eachProduct["sizes"].includes(IPropsTypes.sizeFilter) ||
                            IPropsTypes.sizeFilter === "size") &&
                        (eachProduct["colors"].includes(
                            IPropsTypes.colorFilter
                        ) ||
                            IPropsTypes.colorFilter === "color") &&
                        eachProduct["categories"].includes(
                            IPropsTypes.categoryName
                        )
                    );
                }
            );
            setFilteredFetchedProducts(filteredProducts);
        }
    }, [
        IPropsTypes.categoryName,
        IPropsTypes.colorFilter,
        IPropsTypes.sizeFilter,
        IPropsTypes.sortFilter,
        fetchedProductsFromDB,
    ]);

    // sort the products based on the sort filter value.
    // renders on first time and anytime dependencies will change.
    // TODO FIX: not working, no changes are happening
    useEffect(() => {
        console.log(IPropsTypes.sortFilter);

        if (IPropsTypes.sortFilter === "newest") {
            setFilteredFetchedProducts((prevFilteredFetchedProducts) =>
                [...prevFilteredFetchedProducts].sort(
                    (product1: IProductTypes, product2: IProductTypes) =>
                        product1.createdAt - product2.createdAt
                )
            );
        } else if (IPropsTypes.sortFilter === "asc") {
            setFilteredFetchedProducts((prevFilteredFetchedProducts) =>
                [...prevFilteredFetchedProducts].sort(
                    (product1: IProductTypes, product2: IProductTypes) =>
                        product1.price - product2.price
                )
            );
        } else if (IPropsTypes.sortFilter === "desc") {
            setFilteredFetchedProducts((prevFilteredFetchedProducts) =>
                [...prevFilteredFetchedProducts].sort(
                    (product1: IProductTypes, product2: IProductTypes) =>
                        product2.price - product1.price
                )
            );
        }
        console.log(filteredFetchedProducts);
    }, [
        IPropsTypes.categoryName,
        IPropsTypes.colorFilter,
        IPropsTypes.sizeFilter,
        IPropsTypes.sortFilter,
        fetchedProductsFromDB,
    ]);

    return (
        <Container>
            {/* homepage doesn't have a specific category for products thus show the default fetched products */}
            {(IPropsTypes.categoryName
                ? filteredFetchedProducts
                : fetchedProductsFromDB
            ).map((ProductElement: IProductTypes) => (
                <ProductCard
                    key={ProductElement._id}
                    _id={ProductElement._id}
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
