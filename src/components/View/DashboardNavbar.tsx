import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DollarSign } from "react-feather";
import { AppBar, Box, Hidden, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Logout } from "../Logout/Logout";

interface Props {
    onMobileNavOpen: () => void;
}

const DashboardNavbar: FC<Props> = ({ onMobileNavOpen, ...rest }) => {
    return (
        <AppBar elevation={0} {...rest}>
            <Toolbar>
                <RouterLink to="/">
                    <DollarSign />
                </RouterLink>
                <Box sx={{ flexGrow: 1 }} />
                <Hidden lgDown>
                    <Logout variant={"contained"} />
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
