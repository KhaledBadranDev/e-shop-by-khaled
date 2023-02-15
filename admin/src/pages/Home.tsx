import { FC } from "react";
import styled from "styled-components";
import SmallInfoCards from "../components/SmallInfoCards";
import LatestUsers from "../components/LatestUsers";
import LatestTransactions from "../components/LatestTransactions";

const Home: FC = () => {
    return (
        <Container>
            <SmallInfoCards />
            <WidgetsWrapper>
                <LatestUsers />
                <LatestTransactions />
            </WidgetsWrapper>
        </Container>
    );
};

export default Home;

const Container = styled.div`
    flex: 5;
    padding: 20px;
`;

const WidgetsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
