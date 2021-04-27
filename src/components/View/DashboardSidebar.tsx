import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Divider, Drawer, Hidden, List } from "@material-ui/core";
import {
    BarChart as BarChartIcon,
    User as UserIcon,
    List as ListIcon,
} from "react-feather";
import NavItem from "./NavItem";
import { Logout } from "../Logout/Logout";

interface Props {
    onMobileClose: () => void;
    openMobile: boolean;
}

const items = [
    {
        href: "/app/dashboard",
        icon: BarChartIcon,
        title: "Dashboard",
    },
    {
        href: "/app/account",
        icon: UserIcon,
        title: "Account",
    },
    {
        href: "/app/transactions",
        icon: ListIcon,
        title: "Transactions",
    },
];

const DashboardSidebar: FC<Props> = ({ onMobileClose, openMobile }) => {
    const location = useLocation();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Divider />
            <Box sx={{ p: 2 }}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            width: 256,
                        },
                    }}
                >
                    {content}
                    <Logout variant={"contained"} />
                </Drawer>
            </Hidden>
            <Hidden lgDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 256,
                            top: 64,
                            height: "calc(100% - 64px)",
                        },
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

export default DashboardSidebar;
