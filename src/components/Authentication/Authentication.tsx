import React, { FC } from "react";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import ActionAlert from "../ActionAlert/ActionAlert";

import { Token } from "../App/useToken";
import { Color } from "@material-ui/lab/Alert";

interface Props {
    setToken: (userToken: Token) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export interface Messages {
    msg: string;
    type: Color;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="">
                Mobile Money Service
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `auth-tab-${index}`,
        "aria-controls": `auth-tabpanel-${index}`,
    };
}

function showMsgAlert(
    msgs: Messages[],
    isOpen: boolean,
    setShowMsg: React.Dispatch<React.SetStateAction<boolean>>
) {
    return msgs.map((msg, index) => {
        return (
            <ActionAlert
                msg={msg.msg}
                alert={msg.type}
                key={"alert" + index}
                showMsg={isOpen}
                setShowMsg={setShowMsg}
            />
        );
    });
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const Authentication: FC<Props> = ({ setToken }) => {
    const [value, setValue] = React.useState(0);
    const [messages, setMessages] = React.useState<Messages[]>([]);
    const [showMsg, setShowMsg] = React.useState(true);
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                {showMsgAlert(messages, showMsg, setShowMsg)}
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="Authentication tabs"
                        centered
                    >
                        <Tab label="Sign In" {...a11yProps(0)} />

                        <Tab label="Sign Up" {...a11yProps(1)} />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <Login
                            setToken={setToken}
                            setMessages={setMessages}
                            setShowMsg={setShowMsg}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Signup
                            setMessages={setMessages}
                            setShowMsg={setShowMsg}
                        />
                    </TabPanel>
                </Paper>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default Authentication;
