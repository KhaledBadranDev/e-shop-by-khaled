import { FC, useState, useCallback } from "react";
import styled from "styled-components";
import data, { IUserType } from "../../data/usersSampleData"; // data rows

// docs: https://mui.com/material-ui/react-table/
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// npm install @mui/x-data-grid
import { Link } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@material-ui/core";

const Users: FC = () => {
    const [usersData, setUsersData] = useState<IUserType[]>(data);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const handleDeleteUser = useCallback(
        (id: number) => {
            setUsersData(usersData.filter((user: IUserType) => user.id !== id));
        },
        [usersData]
    );

    const handleDeleteSelected = useCallback(() => {
        setUsersData(
            usersData.filter(
                (user: IUserType) => !selectedRows.includes(user.id)
            )
        );
        setSelectedRows([]);
    }, [usersData, selectedRows]);

    const handleRowSelection = useCallback(
        (rows: any[]) => {
            setSelectedRows(rows);
        },
        [selectedRows]
    );

    // first row = columns
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 30 },
        {
            field: "username",
            headerName: "Username",
            width: 130,
            renderCell: (params) => {
                return (
                    <User>
                        <UserProfilePic
                            className="userListImg"
                            src={params.row.profilePicRef}
                            alt="profile picture"
                        />
                        {params.row.username}
                    </User>
                );
            },
        },
        { field: "email", headerName: "Email", width: 130 },
        {
            field: "lastTransaction",
            headerName: "Last Transaction",
            width: 130,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                // to override the default render for this specific column
                return (
                    <>
                        <Link to={`/users/${params.row.id}`}>
                            <EditIcon
                                style={{ color: "#0d6efd", marginRight: "5px" }}
                            >
                                Edit
                            </EditIcon>
                        </Link>
                        <PersonRemoveIcon
                            style={{ color: "#dc3545" }}
                            onClick={() => handleDeleteUser(params.row.id)}
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
                    rows={usersData}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
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
                    <PersonRemoveIcon
                        style={{ color: "#dc3545", marginRight: "5px" }}
                    />
                    Delete Selected
                </Button>
                <Link to={"/users/newuser"}>
                    <Button
                        variant="outlined"
                        style={{ width: "200px", paddingRight: "78px" }}
                    >
                        <PersonAddAlt1Icon
                            style={{ color: "#198754", marginRight: "5px" }}
                        />
                        Add User
                    </Button>
                </Link>
            </ButtonsWrapper>
        </Container>
    );
};

export default Users;

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

const User = styled.div`
    display: flex;
    align-items: center;
`;

const UserProfilePic = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;
