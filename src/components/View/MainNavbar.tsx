import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import { DollarSign } from "react-feather";
import { FC } from "react";

const MainNavbar: FC<any> = (props) => (
    <AppBar elevation={0} {...props}>
        <Toolbar sx={{ height: 64 }}>
            <RouterLink to="/">
                <DollarSign />
            </RouterLink>
        </Toolbar>
    </AppBar>
);

export default MainNavbar;
