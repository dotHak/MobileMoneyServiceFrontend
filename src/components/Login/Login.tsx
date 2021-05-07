import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../data/entities";
import { Token } from "../../data/useToken";
import { Messages } from "../Authentication/Authentication";
import "./Login.css";

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
  return fetch(baseUrl + "users/login", {
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

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token: Token = await attemptLogin({
      email,
      password,
    });
    if (token !== null) {
      setToken(token);
      navigate("/app/dashboard");
    }

    setMessages([{ msg: "Incorrect email or password!", type: "error" }]);
  };

  return (
    <div className="login-wrapper">
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          type="email"
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
