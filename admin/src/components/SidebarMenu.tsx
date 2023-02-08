import { LineStyle, Timeline, TrendingUp } from "@material-ui/icons";
import React from "react";
import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    ISidebarMenuSectionType,
    ISidebarMenuItemType,
} from "../data/sidebarMenuData";

interface IPropsType {
    sidebarMenuSection: ISidebarMenuSectionType;
    setActiveLink: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarMenu: FC<IPropsType> = (props) => {
    const handleActiveLink = useCallback((itemName: string) => {
        props.sidebarMenuSection.menuItems.forEach(
            (item: ISidebarMenuItemType) => {
                if (itemName === item.name) {
                    item.isActive = true;
                    props.setActiveLink(itemName);
                } else {
                    item.isActive = false;
                }
            }
        );
    }, [props.setActiveLink]);

    return (
        <Wrapper>
            <SidebarTitle>{props.sidebarMenuSection.title}</SidebarTitle>
            <SidebarList>
                {props.sidebarMenuSection.menuItems.map(
                    (item: ISidebarMenuItemType) => (
                        <Link
                            to={item.path}
                            key={item.name}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                            onClick={() => handleActiveLink(item.name)}
                        >
                            <SidebarListItem
                                style={{
                                    backgroundColor: item.isActive
                                        ? "#F0F0FF"
                                        : "inherit",
                                }}
                            >
                                <SidebarIcon>
                                    {React.createElement(item.icon)}
                                </SidebarIcon>
                                {item.name}
                            </SidebarListItem>
                        </Link>
                    )
                )}
            </SidebarList>
        </Wrapper>
    );
};

export default SidebarMenu;

const Wrapper = styled.div`
    margin-bottom: 10px;
`;

const SidebarTitle = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
    list-style: none;
    padding: 5px;
`;

const SidebarListItem = styled.li`
    padding: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;

    &.active,
    &:hover {
        background-color: rgb(240, 240, 255);
    }
`;

const SidebarIcon = styled.div`
    margin-right: 5px;
    font-size: 20px !important;
`;
