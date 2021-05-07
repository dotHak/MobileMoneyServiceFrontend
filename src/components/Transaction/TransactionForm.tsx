import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { networkList, NewTransaction, PhoneNumber } from "../../data/entities";
import { Select } from "../Controls/Select";

interface TransactionFormProps {
  item: NewTransaction;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  phoneNumbers: PhoneNumber[];
  setItem: React.Dispatch<React.SetStateAction<NewTransaction>>;
}

const inputProps = {
  min: "0.00",
  step: "0.1",
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  handleSubmit,
  item,
  setItem,
  phoneNumbers,
}) => {
  const [isPhoneInput, setPhoneInput] = useState(false);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (event.target.name) {
      case "sender":
        setItem({
          ...item,
          sender: phoneNumbers[Number(event.target.value) - 1],
        });
        break;
      case "number":
        setItem({
          ...item,
          receiver: {
            ...(item.receiver as PhoneNumber),
            number: event.target.value,
          },
        });
        break;
      case "network":
        setItem({
          ...item,
          receiver: {
            ...(item.receiver as PhoneNumber),
            network: networkList[Number(event.target.value) - 1],
          },
        });
        break;
      default:
        setItem({
          ...item,
          [event.target.name]: event.target.value,
        });
        break;
    }
  };

  const handleCheckboxChange = () => {
    setPhoneInput(!isPhoneInput);
    if (!isPhoneInput) {
      setItem({
        ...item,
        receiver: {
          number: "",
          network: networkList[0],
          isDefault: false,
        },
        email: undefined,
      });
    } else {
      setItem({
        ...item,
        receiver: undefined,
        email: "",
      });
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Select
                fullWidth
                label="Your Number"
                name="sender"
                value={item.sender}
                onChange={handleChange}
                options={phoneNumbers}
              />
              <FormHelperText>
                Add new number at the account page
              </FormHelperText>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Amount"
                fullWidth
                required
                name="price"
                value={item.price}
                onChange={handleChange}
                type="number"
                inputProps={inputProps}
                error={item.price <= 0}
              />
              <FormHelperText>
                Enter the amount in cedis. Eg. 0.5 = 50 pesewas
              </FormHelperText>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPhoneInput}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Use phone number"
              />
            </Grid>
            {!isPhoneInput ? (
              <Grid item md={6} xs={12}>
                <TextField
                  type="email"
                  fullWidth
                  label="Receiver Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={item.email}
                  variant="outlined"
                />
              </Grid>
            ) : (
              <>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="text"
                    fullWidth
                    label="Receiver Number"
                    name="number"
                    onChange={handleChange}
                    required
                    value={item.receiver?.number}
                    variant="outlined"
                    error={item.receiver?.number.length !== 10}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Select
                    fullWidth
                    required
                    label="Network"
                    name="network"
                    value={item.receiver?.network}
                    onChange={handleChange}
                    options={networkList}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-center",
            p: 2,
          }}
        >
          <Button color="secondary" variant="contained" type="submit">
            Transfer
          </Button>
        </Box>
      </Card>
    </form>
  );
};
