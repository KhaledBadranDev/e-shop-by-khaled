import {
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { FC } from "react";
import styled from "styled-components";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

const User: FC = () => {
    return (
        <Container>
            <UserContainer>
                <UserShow>
                    <UserShowTop>
                        <UserShowImg
                            src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                        />
                        <UserShowTopTitle>
                            <UserShowUsername>Anna Becker</UserShowUsername>
                            <UserShowUserTitle>
                                Software Engineer
                            </UserShowUserTitle>
                        </UserShowTopTitle>
                    </UserShowTop>
                    <UserShowBottom>
                        <UserShowTitle>User Details</UserShowTitle>
                        <UserShowInfo>
                            <UserShowIcon>
                                <PermIdentity />
                            </UserShowIcon>
                            <UserShowInfoTitle>annabeck99</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <UserShowIcon>
                                <PhoneAndroid />
                            </UserShowIcon>
                            <UserShowInfoTitle>2263334444</UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <UserShowIcon>
                                <MailOutline />
                            </UserShowIcon>
                            <UserShowInfoTitle>
                                annabeck99@gmail.com
                            </UserShowInfoTitle>
                        </UserShowInfo>
                        <UserShowInfo>
                            <UserShowIcon>
                                <PersonPinCircleIcon />
                            </UserShowIcon>
                            <UserShowInfoTitle>
                                Toronto, ON Canada
                            </UserShowInfoTitle>
                        </UserShowInfo>
                    </UserShowBottom>
                </UserShow>
                <UserUpdate>
                    <UserUpdateTitle>Update User</UserUpdateTitle>
                    <UserUpdateForm>
                        <UserUpdateLeft>
                            <UserUpdateItem>
                                <UserUpdateLabel>Username</UserUpdateLabel>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="annabeck99"
                                />
                            </UserUpdateItem>

                            <UserUpdateItem>
                                <UserUpdateLabel>Email</UserUpdateLabel>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="annabeck99@gmail.com"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateLabel>Phone</UserUpdateLabel>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="2263334444"
                                />
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateLabel>Address</UserUpdateLabel>
                                <UserUpdateInput
                                    type="text"
                                    placeholder="Toronto, ON Canada"
                                />
                            </UserUpdateItem>
                        </UserUpdateLeft>
                        <UserUpdateRight>
                            <UserUpdateUpload>
                                <UserUpdateImg
                                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    alt="user updated profile picture"
                                />
                                <UserUpdateIcon>
                                    <Publish
                                        style={{
                                            color: "#0d6efd",
                                        }}
                                    />
                                </UserUpdateIcon>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                />
                            </UserUpdateUpload>
                            <UserUpdateButton>
                                <SaveAsIcon
                                    style={{
                                        color: "#0d6efd",
                                        marginRight: "5px",
                                    }}
                                />
                                UPDATE USER
                            </UserUpdateButton>
                        </UserUpdateRight>
                    </UserUpdateForm>
                </UserUpdate>
            </UserContainer>
        </Container>
    );
};

export default User;

const Container = styled.div`
    flex: 5;
    padding: 20px;
`;

const UserTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PageTitle = styled.h1``;

const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const UserShow = styled.div`
    flex: 1;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserUpdate = styled.div`
    flex: 2;
    margin-top: 30px;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`;

const UserShowImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserShowTopTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const UserShowUsername = styled.div`
    font-weight: 600;
`;

const UserShowUserTitle = styled.div`
    font-weight: 300;
`;

const UserShowBottom = styled.div`
    margin-top: 20px;
`;

const UserShowTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
`;

const UserShowIcon = styled.i`
    font-size: 16px !important;
`;

const UserShowInfoTitle = styled.div`
    margin-left: 10px;
`;

const UserUpdateTitle = styled.div`
    font-size: 24px;
    font-weight: 600;
`;

const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const UserUpdateLabel = styled.label`
    margin-bottom: 2px;
    font-size: 14px;
`;

const UserUpdateInput = styled.input`
    width: 250px;
    height: 30px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid gray;
    margin-bottom: 15px;
`;

const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const UserUpdateLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
`;

const UserUpdateImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
`;

const UserUpdateIcon = styled.span`
    cursor: pointer;
`;

const UserUpdateButton = styled.button`
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
