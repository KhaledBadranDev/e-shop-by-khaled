import { FC, useState, useCallback, useEffect } from "react";
import styled from "styled-components";

// docs: https://mui.com/material-ui/react-table/
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// npm install @mui/x-data-grid
import { Link } from "react-router-dom";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@material-ui/core";
import {
    getReduxProducts,
    deleteReduxProduct,
} from "../../api/reduxAPIRequests";
import { useDispatch, useSelector } from "react-redux";
import { IReduxRootStateType } from "../../redux/store";
import { IReduxProductsStateType } from "../../redux/products";

const Products: FC = () => {
    const productsReduxStateDispatch = useDispatch(); // "useDispatch"  to change the value of the global states
    // to access the products global state using redux
    const productsReduxSelector: IReduxProductsStateType = useSelector<
        IReduxRootStateType,
        IReduxProductsStateType
    >((state: any) => state.products);

    const [dbProducts, setDbProducts] = useState<any>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    useEffect(() => {
        // fetch products from db here
        const getProducts = async () => {
            try {
                // this will automatically fetch products from mdb
                // and invoke the products dispatch hook
                // and so the productsReduxSelector will automatically get updated
                await getReduxProducts(productsReduxStateDispatch);
            } catch (error) {
                console.log(error);
            }
        };

        getProducts();
    }, [productsReduxStateDispatch]);

    const handleDeleteProduct = useCallback(
        async (_id: string) => {
            try {
                // this will automatically delete a product from mdb
                // and invoke the products dispatch hook
                // and so the productsReduxSelector will automatically get updated
                await deleteReduxProduct(_id, productsReduxStateDispatch);
            } catch (error) {
                console.log(error);
            }
        },
        [dbProducts]
    );

    const handleDeleteSelected = useCallback(async () => {
        try {
            // this will automatically delete products from mdb
            // and invoke the products dispatch hook
            // and so the productsReduxSelector will automatically get updated
            // don't use foreach here as it doesn't work properly with async await
            for (const rowId of selectedRows)
                await deleteReduxProduct(rowId, productsReduxStateDispatch);
        } catch (error) {
            console.log(error);
        }
        setSelectedRows([]);
    }, [dbProducts, selectedRows]);

    const handleRowSelection = useCallback(
        (rows: any[]) => {
            setSelectedRows(rows);
        },
        [selectedRows]
    );

    // first row = columns
    const columns: GridColDef[] = [
        { field: "_id", headerName: "ID", width: 30 },
        {
            field: "title",
            headerName: "Title",
            width: 180,
            renderCell: (params) => {
                return (
                    <ProductTitleRow>
                        <ProductImage
                            src={params.row.imgReference}
                            alt="profile picture"
                        />
                        {params.row.title}
                    </ProductTitleRow>
                );
            },
        },
        { field: "isInStock", headerName: "Is In Stock", width: 100 },
        {
            field: "price",
            headerName: "Price",
            width: 100,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                // to override the default render for this specific column
                return (
                    <>
                        <Link to={`/product/${params.row._id}`}>
                            <EditIcon
                                style={{ color: "#0d6efd", marginRight: "5px" }}
                            >
                                Edit
                            </EditIcon>
                        </Link>
                        <DisabledByDefaultIcon
                            style={{
                                color: "#dc3545",
                                cursor: "pointer",
                                marginLeft: "5px",
                            }}
                            onClick={() => handleDeleteProduct(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <Container>
            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    // because the _id is not id we have to specify this prop
                    getRowId={(row) => row._id}
                    rows={productsReduxSelector.products}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleRowSelection}
                />
            </div>
            <ButtonsWrapper>
                <Button
                    variant="outlined"
                    style={{ margin: "20px 0px 10px 0px", width: "200px" }}
                    onClick={handleDeleteSelected}
                >
                    <DisabledByDefaultIcon
                        style={{ color: "#dc3545", marginRight: "5px" }}
                    />
                    Delete Selected
                </Button>
                <Link to={"/newproduct"}>
                    <Button
                        variant="outlined"
                        style={{ width: "200px", paddingRight: "47px" }}
                    >
                        <AddBoxIcon
                            style={{ color: "#198754", marginRight: "5px" }}
                        />
                        Add Product
                    </Button>
                </Link>
            </ButtonsWrapper>
        </Container>
    );
};

export default Products;

const Container = styled.div`
    flex: 5;
    padding: 20px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    a {
        text-decoration: none;
    }
`;

const ProductTitleRow = styled.div`
    display: flex;
    align-items: center;
`;

const ProductImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;
