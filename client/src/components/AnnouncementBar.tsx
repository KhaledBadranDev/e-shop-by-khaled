import { FC } from "react";
import styled from "styled-components";

interface propsTypes {
    announcement: string;
}

const AnnouncementBar: FC<propsTypes> = (props) => {
    return <Container>{props.announcement}</Container>;
};

export default AnnouncementBar;

const Container = styled.div`
    height: 30px;
    background-color: white;
    color: #242424;
    font-family: "Franklin Gothic";
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`;
