import { Box, Divider, Drawer, Hidden, List } from "@material-ui/core";
import { FC, useEffect } from "react";
import {
  BarChart as BarChartIcon,
  Icon,
  List as ListIcon,
  LogOut as LogOutIcon,
  ShoppingBag,
  User as UserIcon,
} from "react-feather";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
  isMerchant: boolean;
}
interface SidebarNavItem {
  href: string;
  icon: Icon;
  title: string;
}
const getItems = (include: boolean) => {
  const items: SidebarNavItem[] = [
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
  if (include) {
    items.push({
      href: "/app/merchants",
      icon: ShoppingBag,
      title: "Merchants",
    });
  }
  return items;
};

const DashboardSidebar: FC<Props> = ({
  onMobileClose,
  openMobile,
  isMerchant,
}) => {
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
          {getItems(isMerchant).map((item: SidebarNavItem) => (
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
          <NavItem
            href="/logout"
            title="Logout"
            icon={LogOutIcon}
            key="logout"
          ></NavItem>
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
