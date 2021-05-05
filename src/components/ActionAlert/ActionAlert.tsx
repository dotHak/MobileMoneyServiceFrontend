import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Alert, { Color } from "@material-ui/lab/Alert";

interface Props {
    msg: string;
    alert: Color;
    showMsg: boolean;
    setShowMsg: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            "& > * + *": {
                marginTop: theme.spacing(2),
            },
        },
    })
);

const getAlert = (props: Props): JSX.Element => {
    return (
        <Collapse in={props.showMsg}>
            <Alert
                severity={props.alert}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            props.setShowMsg(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {props.msg}
            </Alert>
        </Collapse>
    );
};

export default function ActionAlert(props: Props) {
    const classes = useStyles();
    const wrapper: React.LegacyRef<HTMLDivElement> = React.createRef();

    return (
        <div className={classes.root} ref={wrapper}>
            {getAlert(props)}
        </div>
    );
}
