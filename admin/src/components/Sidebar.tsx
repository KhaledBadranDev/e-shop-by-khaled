import { FC, useState } from "react";
import styled from "styled-components";
import SidebarMenu from "./SidebarMenu";
import data, { ISidebarMenuSectionType } from "../data/sidebarMenuData";

const Sidebar: FC = () => {
    const [activeLink, setActiveLink] = useState<string>("Home");

    return (
        <Container>
            <Wrapper>
                {data.map((section: ISidebarMenuSectionType) => (
                    <SidebarMenu
                        key={section.title}
                        sidebarMenuSection={section}
                        setActiveLink={setActiveLink}
                    />
                ))}
            </Wrapper>
            {/* the following is to update rendering the active link*/}
            <>
                {data.forEach((sectionData) => {
                    sectionData.menuItems.forEach((menuItem) => {
                        if (menuItem.name !== activeLink)
                            menuItem.isActive = false;
                    });
                })}
            </>
        </Container>
    );
};

export default Sidebar;

const Container = styled.div`
    flex: 1;
    height: calc(100vh - 50px);
    background-color: #09152c;
    position: sticky;
    top: 50px;
    z-index: 10;
`;

const Wrapper = styled.div`
    padding: 20px;
    color: #555;
`;
