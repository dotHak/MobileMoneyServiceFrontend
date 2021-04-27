import { Button, makeStyles } from "@material-ui/core";
import React from "react";

interface ActionButtonProps {
    onClick: () => void;
    color: "root" | "secondary" | "primary";
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5),
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        "& .MuiButton-label": {
            color: theme.palette.secondary.main,
        },
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        "& .MuiButton-label": {
            color: theme.palette.primary.main,
        },
    },
}));

export const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    onClick,
    color,
}) => {
    const classes = useStyles();
    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
