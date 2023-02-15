import { NotificationsNone, Settings } from "@material-ui/icons";
import { FC } from "react";
import styled from "styled-components";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import admin from "../assets/admin.png";

const Topbar: FC = () => {
    return (
        <Container>
            <Wrapper>
                <div className="topLeft">
                    <Logo>E-Shop - by khaled</Logo>
                </div>
                <RightSection>
                    <IconWrapper>
                        <ExitToAppIcon style={{fontSize: "30px", marginTop: "4px"}}/>
                    </IconWrapper>

                    <AdminAvatar src={admin} alt="admin avatar"/>
                </RightSection>
            </Wrapper>
        </Container>
    );
};

export default Topbar;

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: #0a1e33;
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
    color: #cfd4d8;
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
    color: #cfd4d8;
`;

const AdminAvatar = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
`;