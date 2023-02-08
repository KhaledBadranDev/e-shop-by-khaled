import { NotificationsNone, Settings } from "@material-ui/icons";
import { FC } from "react";
import styled from "styled-components";

const Topbar: FC = () => {
    return (
        <Container>
            <Wrapper>
                <div className="topLeft">
                    <Logo>E-Shop - by khaled</Logo>
                </div>
                <RightSection>
                    <IconWrapper>
                        <NotificationsNone />
                        <IconBadge>2</IconBadge>
                    </IconWrapper>

                    <IconWrapper>
                        <Settings />
                    </IconWrapper>
                    <AdminAvatar
                        src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="admin avatar"
                    />
                </RightSection>
            </Wrapper>
        </Container>
    );
};

export default Topbar;

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: #09152c;
    position: sticky;
    top: 0;
    z-index: 10;
`;

const Wrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    font-weight: bold;
    font-size: 30px;
    color: #F0F0FF;
    cursor: pointer;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;

const IconWrapper = styled.div`
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #555;
`;

const IconBadge = styled.span`
    width: 15px;
    height: 15px;
    position: absolute;
    top: -5px;
    right: 0px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`;

const AdminAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;
