import { Box, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { baseUrl } from "../../data/entities";
import { ActionButton } from "../Controls/ActionButton";
import { Popup } from "../Popup/Popup";

interface IAmMerchantProps {
  token: string;
  setIsMerchant: React.Dispatch<React.SetStateAction<boolean>>;
  isMerchant: boolean;
}
const merchantUrl = baseUrl + "merchants";
const addMerchantRole = (token: string) => {
  return fetch(merchantUrl + "/addMerchantRole", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
const removeMerchantRole = (token: string) => {
  return fetch(merchantUrl + "/removeMerchantRole", {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const IAmMerchant: React.FC<IAmMerchantProps> = ({
  token,
  isMerchant,
  setIsMerchant,
}) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClick = () => {
    setOpenPopup(true);
  };
  const handleBecomeMerchant = () => {
    if (isMerchant) {
      removeMerchantRole(token).then(() => setIsMerchant(false));
    } else {
      addMerchantRole(token).then(() => setIsMerchant(true));
    }

    setOpenPopup(false);
  };
  return (
    <Box>
      <Button
        variant="outlined"
        color={isMerchant ? "secondary" : "primary"}
        onClick={handleClick}
      >
        {isMerchant ? "Remove my merchant account" : "I am a Merchant"}
      </Button>
      <Popup
        title={isMerchant ? "Delete Merchant Account" : "Become A Merchant"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
          {isMerchant
            ? "Are you sure you want to delete your account!"
            : "Are you sure you want to become a merchant!"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <ActionButton
            variant="contained"
            color="secondary"
            onClick={handleBecomeMerchant}
          >
            Confirm
          </ActionButton>
        </Box>
      </Popup>
    </Box>
  );
};
