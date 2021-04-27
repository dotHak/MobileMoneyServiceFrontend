import React, { FC, useState } from "react";

import { Token } from "../App/useToken";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import "./Login.css";
import { Messages } from "../Authentication/Authentication";
import { Link as RouterLink } from "react-router-dom";

interface User {
    email: string;
    password: string;
}

interface Props {
    setToken: (userToken: Token) => void;
    setMessages: React.Dispatch<React.SetStateAction<Messages[]>>;
    setShowMsg: React.Dispatch<React.SetStateAction<boolean>>;
}

const attemptLogin = async (credentials: User) => {
    return fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
        .then((data) => data.json())
        .catch((err) => null);
};

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login: FC<Props> = ({ setMessages, setToken, setShowMsg }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const classes = useStyles();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await attemptLogin({
            email,
            password,
        });
        if (token !== null) {
            setToken(token);
            return;
        }

        setMessages([{ msg: "Incorrect eamil or password!", type: "error" }]);
    };

    return (
        <div className="login-wrapper">
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <RouterLink to="/">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setShowMsg(true);
                            setMessages([]);
                        }}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </RouterLink>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Login;
