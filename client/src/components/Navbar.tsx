import styled from "styled-components";

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>1</Left>
                <Center>2</Center>
                <Right>3</Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: black;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    background-color: black;
    display: flex; // to display things horizontally
    justify-content: space-between;
`;

// make the three parts equally big by making using flex:1;
const Left = styled.div`
    flex: 1;
`;

const Center = styled.div`
    flex: 1;
`;

const Right = styled.div`
    flex: 1;
`;
