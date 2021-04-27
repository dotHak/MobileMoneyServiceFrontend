import {
    Dialog,
    DialogContent,
    DialogTitle,
    makeStyles,
    Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { ActionButton } from "../Controls/ActionButton";

interface PopupProps {
    title: string;
    openPopup: boolean;
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5),
    },
    dialogTitle: {
        paddingRight: "0px",
    },
}));

export const Popup: React.FC<PopupProps> = ({
    title,
    openPopup,
    setOpenPopup,
    children,
}) => {
    const classes = useStyles();
    return (
        <Dialog
            open={openPopup}
            maxWidth="md"
            classes={{ paper: classes.dialogWrapper }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="div"
                        style={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <ActionButton
                        color="secondary"
                        onClick={() => {
                            setOpenPopup(false);
                        }}
                    >
                        <CloseIcon />
                    </ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
};
