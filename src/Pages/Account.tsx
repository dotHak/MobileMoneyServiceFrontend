import { Box, Container, Grid } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import AccountProfile from "../components/Account/AccountProfile";
import AccountProfileDetails from "../components/Account/AccountProfileDetails";
import PhoneNumberList from "../components/PhoneNumbers/PhoneNumberList";
import {
  baseUrl,
  isNotFoundResponse,
  NotFoundResponse,
  UserDetail,
} from "../data/entities";

interface Props {
  token: string;
}

const getUserDatail = async (token: string) => {
  return fetch(baseUrl + "usersDetails", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const Account: FC<Props> = ({ token }) => {
  const [userDetail, setUserDetail] = useState<UserDetail>({
    firstName: "",
    lastName: "",
    middleName: "",
    houseNumber: "",
    region: "",
    city: "",
    town: "",
  });

  useEffect(() => {
    getUserDatail(token).then((data: UserDetail | NotFoundResponse) => {
      if (!isNotFoundResponse(data)) {
        setUserDetail(data);
      }
    });
  }, [token]);

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
                <PhoneNumberList token={token} />
              </Box>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails
                userDatails={userDetail}
                setUserDatails={setUserDetail}
                token={token}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
