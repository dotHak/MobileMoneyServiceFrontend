import { Box, Card, CardContent, Container, Grid } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { FingerprintUpload } from "../../src/components/Fingerprint/FingerprintUpload";
import { IAmMerchant } from "../../src/components/Merchant/IAmMerchant";
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
  setIsMerchant: React.Dispatch<React.SetStateAction<boolean>>;
  isMerchant: boolean;
}

const getUserDetail = async (token: string) => {
  return fetch(baseUrl + "usersDetails", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const Account: FC<Props> = ({ token, isMerchant, setIsMerchant }) => {
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
    getUserDetail(token).then((data: UserDetail | NotFoundResponse) => {
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
                userDetails={userDetail}
                setUserDetails={setUserDetail}
                token={token}
              />
              <Box sx={{ pt: 3 }}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item lg={4} md={6} xs={12}>
                        <IAmMerchant
                          token={token}
                          isMerchant={isMerchant}
                          setIsMerchant={setIsMerchant}
                        />
                      </Grid>
                      <Grid item lg={8} md={6} xs={12}>
                        <FingerprintUpload token={token} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
