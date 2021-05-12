import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MerchantForm from "../components/Merchant/MerchantForm";
import { MerchantList } from "../components/Merchant/MerchantList";
import MerchantListToolbar from "../components/Merchant/MerchantListToolbar";
import { Popup } from "../components/Popup/Popup";
import {
  baseUrl,
  ErrorResponse,
  isErrorResponse,
  Merchant,
} from "../data/entities";

interface MerchantProps {
  token: string;
}

const initialMerchant: Merchant = {
  name: "",
  email: "",
  address: "",
  region: "",
  city: "",
  phoneNumbers: [],
};

const merchantUrl = baseUrl + "merchants";

const getMerchants = (token: string) => {
  return fetch(merchantUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const saveMerchant = (token: string, data: Merchant) => {
  return fetch(merchantUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
const updateMerchant = (token: string, data: Merchant, id: number) => {
  return fetch(merchantUrl + `/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};
export const Merchants: React.FC<MerchantProps> = ({ token }) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [backupList, setBackupList] = useState<Merchant[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [formMerchant, setFormMerchant] = useState(initialMerchant);

  const [errorMessage, setErrorMessage] = useState<String[]>([
    "An error occurred!",
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let merchant: Merchant | ErrorResponse;
    if (formMerchant.id === undefined) {
      merchant = await saveMerchant(token, formMerchant);
    } else {
      merchant = await updateMerchant(token, formMerchant, formMerchant.id);
    }

    if (isErrorResponse(merchant)) {
      setOpenPopup(false);
      setErrorMessage(merchant.errors);
      setErrorPopup(true);
      return;
    }

    setOpenPopup(false);
    if (formMerchant.id === undefined) setMerchants([...merchants, merchant]);
  };

  useEffect(() => {
    getMerchants(token).then((data: Merchant[]) => {
      setMerchants(data);
      setBackupList(data);
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
        <Container maxWidth={false}>
          <MerchantListToolbar
            backupList={backupList}
            setMerchants={setMerchants}
            setOpenPopup={setOpenPopup}
          />
          <Box sx={{ pt: 3 }}>
            <MerchantList
              merchants={merchants}
              setOpenPopup={setOpenPopup}
              setFormMerchant={setFormMerchant}
            />
          </Box>
        </Container>
      </Box>
      <Box>
        <Popup
          title="New Merchant"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          key="transactionForm"
        >
          <MerchantForm
            merchant={formMerchant}
            setMerchant={setFormMerchant}
            handleSubmit={handleSubmit}
          />
        </Popup>
        <Popup
          title="Transfer Error"
          openPopup={errorPopup}
          setOpenPopup={setErrorPopup}
          key="errorMessage"
        >
          {errorMessage.map((errorMsg, index) => {
            return (
              <Typography key={index} variant="h6" component="div">
                {errorMsg}
              </Typography>
            );
          })}
        </Popup>
      </Box>
    </>
  );
};
