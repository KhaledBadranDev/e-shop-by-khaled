import React, { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    ISidebarMenuSectionType,
    ISidebarMenuItemType,
} from "../data/sidebarMenuData";

interface IPropsType {
    sidebarMenuSection: ISidebarMenuSectionType;
    setActiveLinks: React.Dispatch<React.SetStateAction<string[]>>;
    activeLinks: string[];
}

const SidebarMenu: FC<IPropsType> = (props) => {
    const handleActiveLink = useCallback(
        (itemName: string, isSubItem: boolean, rootItemName: string = "") => {
            const tmp: string[] = isSubItem ? [rootItemName] : [];

            tmp.push(itemName);
            props.setActiveLinks(tmp);
        },
        [props.activeLinks]
    );

    const renderSidebarMenu = (
        item: ISidebarMenuItemType,
        isSubItem: boolean = false,
        rootItemName: string = ""
    ) => {
        return (
            <SidebarListItemWrapper>
                <Link
                    to={item.path}
                    key={item.name}
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                    onClick={() =>
                        handleActiveLink(item.name, isSubItem, rootItemName)
                    }
                >
                    <SidebarListItem
                        style={{
                            backgroundColor: item.isActive
                                ? "#122C44"
                                : "inherit",
                        }}
                    >
                        <SidebarIcon>
                            {React.createElement(item.icon)}
                        </SidebarIcon>
                        {item.name}
                    </SidebarListItem>
                </Link>
            </SidebarListItemWrapper>
        );
    };

    const renderSidebarSubMenu = (
        subMenuItems: ISidebarMenuItemType[],
        rootItemName
    ) => {
        return (
            <>
                {subMenuItems.map((item: ISidebarMenuItemType) => (
                    <SidebarSubListItemWrapper key={item.name}>
                        {renderSidebarMenu(item, true, rootItemName)}
                    </SidebarSubListItemWrapper>
                ))}
            </>
        );
    };

    return (
        <Wrapper>
            <SidebarTitle>{props.sidebarMenuSection.title}</SidebarTitle>
            <SidebarList>
                {props.sidebarMenuSection.menuItems.map(
                    (item: ISidebarMenuItemType) => (
                        <>
                            {renderSidebarMenu(item)}
                            {item.subMenuItems &&
                                renderSidebarSubMenu(
                                    item.subMenuItems,
                                    item.name
                                )}
                        </>
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
    font-size: 14px;
    font-weight: bold;

    color: #669df6;
`;

const SidebarList = styled.ul`
    list-style: none;
    color: #cfd4d8;
    padding: 2px;
    margin-top: 5px;
`;

const SidebarListItem = styled.li`
    padding: 2px;
    margin: 5px 0px 1px 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;

    &.active,
    &:hover {
        background-color: #122c44;
    }
`;

const SidebarSubListItemWrapper = styled.div`
    margin: 0px 0px 0px 20px;
    padding: 1px;
    border-radius: 10px;

    cursor: pointer;

    &.active,
    &:hover {
        background-color: #122c44;
    }
`;
const SidebarListItemWrapper = styled.div`
    border-radius: 10px;
    padding: 1px;

    cursor: pointer;

    &.active,
    &:hover {
        background-color: #122c44;
    }
`;

const SidebarIcon = styled.div`
    margin-right: 5px;
    font-size: 10px;
`;
