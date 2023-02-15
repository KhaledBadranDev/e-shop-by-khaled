import { FC, useState } from "react";
import styled from "styled-components";
import SidebarMenu from "./SidebarMenu";
import data, { ISidebarMenuSectionType } from "../data/sidebarMenuData";

const Sidebar: FC = () => {
    const [activeLinks, setActiveLinks] = useState<string[]>(["Home"]);
    console.log("activeLinks", activeLinks);

    return (
        <Container>
            <Wrapper>
                {data.map((section: ISidebarMenuSectionType) => (
                    <SidebarMenu
                        key={section.title}
                        sidebarMenuSection={section}
                        activeLinks={activeLinks}
                        setActiveLinks={setActiveLinks}
                    />
                ))}
            </Wrapper>
            {/* the following is to update rendering the active link*/}
            <>
                {data.forEach((sectionData) => {
                    sectionData.menuItems.forEach((menuItem) => {
                        if (!activeLinks.includes(menuItem.name))
                            menuItem.isActive = false;
                        else menuItem.isActive = true;
                        if (menuItem.subMenuItems) {
                            menuItem.subMenuItems.forEach((subMenuItem) => {
                                if (!activeLinks.includes(subMenuItem.name))
                                    subMenuItem.isActive = false;
                                else subMenuItem.isActive = true;
                            });
                        }
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
    background-color: #0a1e33;
    position: sticky;
    top: 50px;
    z-index: 10;
`;

const Wrapper = styled.div`
    padding: 20px;
`;
