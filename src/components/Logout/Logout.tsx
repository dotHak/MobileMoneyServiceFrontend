import React from "react";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

interface LogoutProps {
    variant: "text" | "outlined" | "contained" | undefined;
}

export const Logout: React.FC<LogoutProps> = ({ variant }) => {
    return (
        <RouterLink to="/signin">
            <Button
                variant={variant}
                onClick={() => localStorage.removeItem("token")}
            >
                Logout
            </Button>
        </RouterLink>
    );
};
