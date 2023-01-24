import { FC } from "react";
import { AiFillYoutube, AiOutlineGithub } from "react-icons/ai";
import { FaBloggerB } from "react-icons/fa";
import styled from "styled-components";
import { mobile } from "../util/styleResponsive";

const Footer: FC = () => {
    return (
        <Container>
            <FirstHalf>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </FirstHalf>

            <SecondHalf>
                <CopyrightContainer>
                    © 2022 &nbsp;
                    <a href="https://www.khaledbadran.ca" target="_blank">
                        Khaled Badran
                    </a>
                    .&nbsp;All rights reserved.
                    <br />
                    Built with ❤️
                </CopyrightContainer>

                <SocialMediaContainer>
                    <SocialMediaIcon>
                        {/* youtube  */}
                        <a
                            className="btn btn-outline-light m-1"
                            href="https://www.youtube.com/channel/UCq1qtlU3urNPLd5yIwhht1w"
                            target="_blank"
                            role="button"
                            style={{ borderRadius: "100%" }}
                        >
                            <AiFillYoutube
                                style={{ color: "red", fontSize: "25px" }}
                            />
                        </a>
                    </SocialMediaIcon>
                    <SocialMediaIcon>
                        {/* github  */}
                        <a
                            className="btn btn-outline-light m-1"
                            href="https://github.com/ProgrammingGym"
                            target="_blank"
                            role="button"
                            style={{ borderRadius: "100%" }}
                        >
                            <AiOutlineGithub style={{ fontSize: "25px" }} />
                        </a>
                    </SocialMediaIcon>
                    <SocialMediaIcon>
                        {/* blogger */}
                        <a
                            className="btn btn-outline-light m-1"
                            href="https://programming-gym.blogspot.com/"
                            target="_blank"
                            role="button"
                            style={{ borderRadius: "100%" }}
                        >
                            <FaBloggerB
                                style={{ color: "orange", fontSize: "25px" }}
                            />
                        </a>
                    </SocialMediaIcon>
                </SocialMediaContainer>
            </SecondHalf>
        </Container>
    );
};

export default Footer;

const Container = styled.div`
    background-color: #09152c;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    ${mobile({ padding: "10px 0px" })}
`;

const FirstHalf = styled.div`
    flex: 1;
`;

const SecondHalf = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const SocialMediaContainer = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ padding: "10px 0px" })}
`;

const SocialMediaIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: black;
    margin-right: 20px;
`;

const CopyrightContainer = styled.div`
    padding: 30px 20px 10px 20px;
    display: block;
    ${mobile({ padding: "10px 0px" })}
`;
