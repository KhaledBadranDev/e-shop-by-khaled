import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Visibility } from "@material-ui/icons";
import { axiosAuthAdminRequest } from "../api/requestMethods";

const LatestUsers: FC = () => {
    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const relativePath = "/users?limit=7";
                const method = "GET";
                const latestFetchedUsers = await axiosAuthAdminRequest(
                    relativePath,
                    method
                );
                setUsers(latestFetchedUsers);
            } catch {}
        };
        getUsers();
    }, []);

    return (
        <Container>
            <WidgetTitle>Latest Joined Users</WidgetTitle>
            <WidgetList>
                {users.map((user) => (
                    <WidgetListItem key={user._id}>
                        <WidgetImg
                            src={
                                user.img ||
                                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                            }
                            alt="user image"
                        />
                        <UserWrapper>
                            <Username>
                                {user.username}
                            </Username>
                        </UserWrapper>
                        <WidgetButton>
                            <WidgetIcon>
                            <Visibility />
                            </WidgetIcon>
                            Display
                        </WidgetButton>
                    </WidgetListItem>
                ))}
            </WidgetList>
        </Container>
    );
};

export default LatestUsers;

const Container = styled.div`
    flex: 1;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-right: 20px;
`;

const WidgetTitle = styled.div`
    font-size: 22px;
    font-weight: 600;
`;

const WidgetImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const WidgetList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;

const WidgetListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`;

const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Username = styled.div`
    font-weight: 600;
`;

const WidgetSmUserTitle = styled.div`
    font-weight: 300;
`;

const WidgetButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`;

const WidgetIcon = styled.i`
    font-size: 16px !important;
    margin-right: 5px;
`;
