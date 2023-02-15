import { FC } from "react";
import styled from "styled-components";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const NewUser: FC = () => {
    return (
        <Container>
            <h1 className="newUserTitle">New User</h1>
            <NewUserForm>
                <NewUserItem>
                    <NewUserLabel>Username</NewUserLabel>
                    <NewUserInput type="text" placeholder="john" required />
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel>Email</NewUserLabel>
                    <NewUserInput
                        type="email"
                        placeholder="john@gmail.com"
                        required
                    />
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel>Password</NewUserLabel>
                    <NewUserInput
                        type="password"
                        placeholder="password"
                        required
                    />
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel>Phone</NewUserLabel>
                    <NewUserInput type="text" placeholder="2263334444" />
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel>Address</NewUserLabel>
                    <NewUserInput
                        type="text"
                        placeholder="Toronto, ON Canada"
                    />
                </NewUserItem>
                <NewUserItem>
                    <NewUserLabel>Gender</NewUserLabel>
                    <div className="newUserGender">
                        <NewUserGenderInput
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                        />
                        <NewUserGenderLabel htmlFor="male">Male</NewUserGenderLabel>
                        <NewUserGenderInput
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                        />
                        <NewUserGenderLabel htmlFor="female">
                            Female
                        </NewUserGenderLabel>
                        <NewUserGenderInput
                            type="radio"
                            name="gender"
                            id="other"
                            value="other"
                        />
                        <NewUserGenderLabel htmlFor="other">
                            Other
                        </NewUserGenderLabel>
                    </div>
                </NewUserItem>

                <NewUserButton className="newUserButton">
                    <PersonAddAlt1Icon
                        style={{ color: "#198754", marginRight: "5px" }}
                    />
                    ADD USER
                </NewUserButton>
            </NewUserForm>
        </Container>
    );
};

export default NewUser;

const Container = styled.div`
    flex: 5;
    padding: 20px;
`;

const NewUserForm = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const NewUserItem = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`;

const NewUserLabel = styled.label`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
`;

const NewUserInput = styled.input`
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
`;

const NewUserGenderInput = styled.input`
    margin-top: 15px;
`;

const NewUserGenderLabel = styled.label`
    margin: 10px;
    font-size: 18px;
    color: #555;
`;

const NewUserButton = styled.button`
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
