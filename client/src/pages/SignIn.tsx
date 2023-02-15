import { FC, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import reduxSignInAsyncAPICallHelper from "../api/reduxAPIRequests";
import { IReduxRootStateType } from "../redux/store";
import { IReduxUserStateType } from "../redux/user";
import { mobile } from "../utils/styleResponsive";

const SignIn: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const userReduxStateDispatch = useDispatch(); // "useDispatch"  to change the value of the global states
    // to access the cart global state using redux
    const userRedux: IReduxUserStateType = useSelector<
        IReduxRootStateType,
        IReduxUserStateType
    >((state: any) => state.user);

    // using arrow functions or binding in tSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies.
    const handleSetUsername = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
        },
        [email]
    );

    const handleSetPassword = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
        },
        [password]
    );

    const handelSignIn = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            reduxSignInAsyncAPICallHelper(userReduxStateDispatch, {
                email,
                password,
            });
        },
        [email, password]
    );
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="email" onChange={handleSetUsername} />
                    <Input
                        placeholder="password"
                        type="password"
                        onChange={handleSetPassword}
                    />
                    <Button
                        onClick={(event) => handelSignIn(event)}
                        disabled={userRedux.isAsyncSigningIn}
                    >
                        Sign In
                    </Button>

                    {
                        //  conditional rendering if there is any error
                        userRedux.error.length > 0 && (
                            <Error>{userRedux.error}</Error>
                        )
                    }
                    <Link>FORGOT YOUR PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default SignIn;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        color: transparent;
        cursor: not-allowed;
    }
`;

const Error = styled.span`
    color: red;
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;
