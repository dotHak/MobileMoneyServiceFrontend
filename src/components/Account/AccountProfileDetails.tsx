import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from "@material-ui/core";
import {
    UserDetail,
    NotFoundResponse,
    isNotFoundResponse,
} from "../../entities";

interface Props {
    userDatails: UserDetail;
    setUserDatails: React.Dispatch<React.SetStateAction<UserDetail>>;
    token: string;
}

const detailUrl: string = "http://localhost:8080/api/v1/usersDetails";

const saveUserDatail = async (token: string, credentials: UserDetail) => {
    return fetch(detailUrl, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
};

const updateUserDatail = async (
    token: string,
    credentials: UserDetail,
    id: number
) => {
    return fetch(detailUrl + "/" + id, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
};

const AccountProfileDetails = (props: Props) => {
    const handleChange = (event: any) => {
        props.setUserDatails({
            ...props.userDatails,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let detail: UserDetail | NotFoundResponse;
        if (props.userDatails.id) {
            detail = await updateUserDatail(
                props.token,
                props.userDatails,
                props.userDatails.id
            );
        } else {
            detail = await saveUserDatail(props.token, props.userDatails);
        }
        if (!isNotFoundResponse(detail)) {
            props.setUserDatails(detail);
        }
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="First name"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={props.userDatails.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Last name"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={props.userDatails.lastName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                name="middleName"
                                onChange={handleChange}
                                value={props.userDatails.middleName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Regeon"
                                name="region"
                                onChange={handleChange}
                                required
                                value={props.userDatails.region}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                onChange={handleChange}
                                required
                                value={props.userDatails.city}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Town"
                                name="town"
                                onChange={handleChange}
                                required
                                value={props.userDatails.town}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="House Number"
                                name="houseNumber"
                                onChange={handleChange}
                                required
                                value={props.userDatails.houseNumber}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                    }}
                >
                    <Button color="primary" variant="contained" type="submit">
                        Save details
                    </Button>
                </Box>
            </Card>
        </form>
    );
};

export default AccountProfileDetails;
