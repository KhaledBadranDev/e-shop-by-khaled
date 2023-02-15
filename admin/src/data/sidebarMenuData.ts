import { SvgIconProps } from "@material-ui/core";
import {
    LineStyle,
    PermIdentity,
    Storefront,
    Report,
} from "@material-ui/icons";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface ISidebarMenuItemType {
    name: string;
    path: string;
    isActive: boolean; //is clicked and selected
    subMenuItems?: ISidebarMenuItemType[]; // self reference
    icon: React.ElementType<SvgIconProps<"svg", {}>>;
}

interface ISidebarMenuSectionType {
    title: string;
    menuItems: ISidebarMenuItemType[];
}

const data: ISidebarMenuSectionType[] = [
    {
        title: "Dashboard",
        menuItems: [
            {
                name: "Home",
                path: "/",
                isActive: true,
                icon: LineStyle,
            },
        ],
    },
    {
        title: "Management",
        menuItems: [
            {
                name: "Users",
                path: "/users",
                isActive: false,
                subMenuItems: [
                    {
                        name: "Add User",
                        path: "/users/newuser",
                        isActive: false,
                        icon: PersonAddAlt1Icon as React.ElementType<
                            SvgIconProps<"svg", {}>
                        >,
                    },
                    {
                        name: "Update User",
                        path: "",
                        isActive: false,
                        icon: EditIcon as React.ElementType<
                            SvgIconProps<"svg", {}>
                        >,
                    },
                ],
                icon: PermIdentity,
            },
            {
                name: "Products",
                path: "/products",
                isActive: false,
                subMenuItems: [
                    {
                        name: "Add Product",
                        path: "/products/newproduct",
                        isActive: false,
                        icon: AddBoxIcon as React.ElementType<
                            SvgIconProps<"svg", {}>
                        >,
                    },
                    {
                        name: "Update Product",
                        path: "",
                        isActive: false,
                        icon: EditIcon as React.ElementType<
                            SvgIconProps<"svg", {}>
                        >,
                    },
                ],
                icon: Storefront,
            },
        ],
    },
    {
        title: "Account",
        menuItems: [
            {
                name: "Sign Out",
                path: "/",
                isActive: false,
                icon: ExitToAppIcon as React.ElementType<
                    SvgIconProps<"svg", {}>
                >,
            },
        ],
    },
];

export default data;
export type { ISidebarMenuItemType, ISidebarMenuSectionType };
