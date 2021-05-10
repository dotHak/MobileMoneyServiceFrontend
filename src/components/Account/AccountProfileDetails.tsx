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
import React, { FC } from "react";
import {
  baseUrl,
  isNotFoundResponse,
  NotFoundResponse,
  UserDetail,
} from "../../data/entities";

interface Props {
  userDetails: UserDetail;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetail>>;
  token: string;
}

const detailUrl: string = baseUrl + "usersDetails";

const saveUserDetail = async (token: string, credentials: UserDetail) => {
  return fetch(detailUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

const updateUserDetail = async (
  token: string,
  credentials: UserDetail,
  id: number
) => {
  return fetch(detailUrl + "/" + id, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

const AccountProfileDetails: FC<Props> = ({
  userDetails,
  token,
  setUserDetails,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let detail: UserDetail | NotFoundResponse;
    if (userDetails.id) {
      detail = await updateUserDetail(token, userDetails, userDetails.id);
    } else {
      detail = await saveUserDetail(token, userDetails);
    }
    if (!isNotFoundResponse(detail)) {
      setUserDetails(detail);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
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
                value={userDetails.firstName}
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
                value={userDetails.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                onChange={handleChange}
                value={userDetails.middleName || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Region"
                name="region"
                onChange={handleChange}
                required
                value={userDetails.region}
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
                value={userDetails.city}
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
                value={userDetails.town}
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
                value={userDetails.houseNumber}
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
