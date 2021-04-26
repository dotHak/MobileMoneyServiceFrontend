import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "../components/Account/AccountProfile";
import AccountProfileDetails from "../components/Account/AccountProfileDetails";
import {
    UserDetail,
    NotFoundResponse,
    isNotFoundResponse,
    PhoneNumber,
} from "../entities";
import PhoneNumberList from "../components/PhoneNumbers/PhoneNumberList";

interface Props {
    token: string;
}

const phoneUrl: string = "http://localhost:8080/api/v1/phoneNumbers/user";

const getPhoneNumbers = async (token: string) => {
    return fetch(phoneUrl, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    }).then((data) => data.json());
};

const getUserDatail = async (token: string) => {
    return fetch("http://localhost:8080/api/v1/usersDetails", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    }).then((data) => data.json());
};

const Account = (props: Props) => {
    const [userDetail, setUserDetail] = useState<UserDetail>({
        firstName: "",
        lastName: "",
        middleName: "",
        houseNumber: "",
        region: "",
        city: "",
        town: "",
    });

    const [phones, setPhones] = useState<PhoneNumber[]>([]);

    useEffect(() => {
        getUserDatail(props.token).then(
            (data: UserDetail | NotFoundResponse) => {
                if (!isNotFoundResponse(data)) {
                    setUserDetail(data);
                }
            }
        );

        getPhoneNumbers(props.token).then(
            (data: PhoneNumber[] | NotFoundResponse) => {
                if (!isNotFoundResponse(data)) {
                    setPhones(data);
                }
            }
        );
    }, [props.token]);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 3,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <AccountProfile userDetail={userDetail} />
                            <Box sx={{ pt: 3 }}>
                                <PhoneNumberList phoneNumberList={phones} />
                            </Box>
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <AccountProfileDetails
                                userDatails={userDetail}
                                setUserDatails={setUserDetail}
                                token={props.token}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Account;
