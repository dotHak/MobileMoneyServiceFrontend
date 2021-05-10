import { Button, ListItem } from "@material-ui/core";
import { Icon } from "react-feather";
import {
  matchPath,
  NavLink as RouterLink,
  useLocation,
} from "react-router-dom";
interface NavItemProps {
  href: string;
  icon: Icon;
  title: string;
  colorMain?: string;
  colorActive?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon: Icon,
  title,
  colorMain,
  colorActive,
}) => {
  const location = useLocation();
  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
    >
      <Button
        component={RouterLink}
        sx={{
          color: colorMain,
          fontWeight: "medium",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",
          ...(active && {
            color: colorActive,
          }),
          "& svg": {
            mr: 1,
          },
        }}
        to={href}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};
NavItem.defaultProps = {
  colorMain: "text.secondary",
  colorActive: "primary.main",
};
export default NavItem;
