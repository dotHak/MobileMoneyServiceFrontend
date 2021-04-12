import { useState } from "react";

export interface Token {
    token: string;
}

const useToken = (): [token: string, setToken: (userToken: Token) => void] => {
    const getToken = (): string => {
        const tokenString = localStorage.getItem("token");
        const userToken: Token = JSON.parse(tokenString!);
        return userToken?.token;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: Token) => {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return [token, saveToken];
};

export default useToken;
