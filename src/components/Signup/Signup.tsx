import React, { FC, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import { Token } from "../App/useToken";
import { Messages } from "../Authentication/Authentication";

interface User {
    email: string;
    password: string;
}

interface ErrorResponse {
    errors: string[];
    status: number;
}

interface Props {
    setShowMsg: React.Dispatch<React.SetStateAction<boolean>>;
    setMessages: React.Dispatch<React.SetStateAction<Messages[]>>;
}

const attemptSignup = async (credentials: User) => {
    return fetch("http://localhost:8080/api/v1/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
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

function isErrorResponse(res: Token | ErrorResponse): res is ErrorResponse {
    return (res as ErrorResponse).status !== undefined;
}

const Signup: FC<Props> = ({ setShowMsg, setMessages }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const classes = useStyles();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response: ErrorResponse | Token = await attemptSignup({
            email,
            password,
        });
        let messges: Messages[] = [];
        if (isErrorResponse(response)) {
            response.errors.forEach((err) => {
                messges.push({ msg: err, type: "error" });
            });

            setMessages(messges);
        } else {
            const successMsg: string =
                "Your account has been created — check your email and confirm!";
            messges.push({ msg: successMsg, type: "success" });
            setMessages(messges);
        }
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
                    onChange={(e: any) => setEmail(e.target.value)}
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
                    onChange={(e: any) => setPassword(e.target.value)}
                    autoComplete="current-password"
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
                        Sign Up
                    </Button>
                </RouterLink>
            </form>
        </div>
    );
};

export default Signup;
