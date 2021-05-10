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
import { Merchant } from "../../data/entities";

interface Props {
  merchant: Merchant;
  setMerchant: React.Dispatch<React.SetStateAction<Merchant>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const MerchantForm: FC<Props> = ({ merchant, setMerchant, handleSubmit }) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMerchant({
      ...merchant,
      [event.target.name]: event.target.value,
    });
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
                label="Venture Name"
                name="name"
                onChange={handleChange}
                required
                value={merchant.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Venture Email"
                name="email"
                onChange={handleChange}
                required
                value={merchant.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                label="Address"
                name="address"
                onChange={handleChange}
                value={merchant.address}
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
                value={merchant.region}
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
                value={merchant.city}
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
            Save Merchant details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default MerchantForm;
