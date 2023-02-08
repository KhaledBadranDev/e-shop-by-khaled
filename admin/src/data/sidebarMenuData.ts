import { SvgIconProps } from "@material-ui/core";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@material-ui/icons";

interface ISidebarMenuItemType {
    name: string;
    path: string;
    isActive: boolean; //is clicked and selected
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
                isActive:true,
                icon: LineStyle,
            },
            {
                name: "Analytics",
                path: "/",
                isActive:false,
                icon: Timeline,
            },
            {
                name: "Sales",
                path: "/",
                isActive:false,
                icon: TrendingUp,
            },
        ],
    },
    {
        title: "Quick Menu",
        menuItems: [
            {
                name: "Users",
                path: "/users",
                isActive:false,
                icon: PermIdentity,
            },
            {
                name: "Products",
                path: "/products",
                isActive:false,
                icon: Storefront,
            },
            {
                name: "Transactions",
                path: "/",
                isActive:false,
                icon: AttachMoney,
            },
            {
                name: "Reports",
                path: "/",
                isActive:false,
                icon: BarChart,
            },
        ],
    },
    {
        title: "Notifications",
        menuItems: [
            {
                name: "Mail",
                path: "/",
                isActive:false,
                icon: MailOutline,
            },
            {
                name: "Feedback",
                path: "/",
                isActive:false,
                icon: DynamicFeed,
            },
            {
                name: "Messages",
                path: "/",
                isActive:false,
                icon: ChatBubbleOutline,
            },
        ],
    },
    {
        title: "Staff",
        menuItems: [
            {
                name: "Manage",
                path: "/",
                isActive:false,
                icon: WorkOutline,
            },
            {
                name: "Analytics",
                path: "/",
                isActive:false,
                icon: Timeline,
            },
            {
                name: "Reports",
                path: "/",
                isActive:false,
                icon: Report,
            },
        ],
    },
];

export default data;
export type {
    ISidebarMenuItemType,
    ISidebarMenuSectionType
};
