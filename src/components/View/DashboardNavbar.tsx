import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { FC } from "react";
import { DollarSign, LogOut as LogOutIcon } from "react-feather";
import { Link as RouterLink } from "react-router-dom";

interface DashboardNavbarProps {
  onMobileNavOpen: () => void;
}

const DashboardNavbar: FC<DashboardNavbarProps> = ({ onMobileNavOpen }) => {
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <RouterLink to="/">
          <IconButton>
            <DollarSign color="white" />
          </IconButton>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <RouterLink to="/logout" color="white">
              <Button endIcon={<LogOutIcon color="#ffffff" />}>
                <Box
                  sx={{
                    color: "#ffffff",
                  }}
                >
                  Logout
                </Box>
              </Button>
            </RouterLink>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
