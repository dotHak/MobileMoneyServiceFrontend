import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { FC } from "react";
import { DollarSign } from "react-feather";
import { Link as RouterLink } from "react-router-dom";

const MainNavbar: FC<any> = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <DollarSign color="#ffffff" />
        <Box sx={{ color: "#ffffff" }}>
          <Typography variant="h3">Finger Pay</Typography>
        </Box>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
