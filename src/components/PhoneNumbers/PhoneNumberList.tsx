import {
  Box,
  Button,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import {
  baseUrl,
  ErrorResponse,
  isErrorResponse,
  isNotFoundResponse,
  networkList,
  NotFoundResponse,
  PhoneNumber,
} from "../../data/entities";
import { Popup } from "../Popup/Popup";
import { PhoneNumberForm } from "./PhoneNumberForm";

interface Props {
  token: string;
}

type Method = "POST" | "PUT";

const phoneUrl: string = baseUrl + "phoneNumbers";

const savePhoneNumber = async (
  token: string,
  data: PhoneNumber,
  method: Method,
  path: string
) => {
  return fetch(phoneUrl + path, {
    method: method,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};

const getPhoneNumbers = async (token: string) => {
  return fetch(phoneUrl + "/user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const defaultNumber: PhoneNumber = {
  isDefault: false,
  number: "",
  network: networkList[0],
};

const PhoneNumberList: FC<Props> = ({ token }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [formNumber, setFormNumber] = useState<PhoneNumber>(defaultNumber);
  const [isNew, setIsNew] = useState(true);
  const [errorMessage, setErrorMessage] = useState<String[]>([]);
  const [phones, setPhones] = useState<PhoneNumber[]>([]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const method: Method = isNew ? "POST" : "PUT";
    const response: PhoneNumber | ErrorResponse = await savePhoneNumber(
      token,
      formNumber,
      method,
      `${isNew ? "/user" : "/user/" + formNumber.id}`
    );

    if (isErrorResponse(response)) {
      setErrorMessage(response.errors);
      setErrorPopup(true);
    }

    setOpenPopup(false);
    setPhones([...phones, response as PhoneNumber]);
  };

  useEffect(() => {
    getPhoneNumbers(token).then((data: PhoneNumber[] | NotFoundResponse) => {
      if (!isNotFoundResponse(data)) {
        setPhones(data);
      }
    });
  }, [token]);

  return (
    <>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenPopup(true);
              setIsNew(true);
              setFormNumber(defaultNumber);
            }}
          >
            New
          </Button>
        </Box>

        <Divider />

        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>Network</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {phones.map((phoneNumber, index) => {
                return (
                  <TableRow hover key={phoneNumber.id}>
                    <TableCell>{phoneNumber.number}</TableCell>
                    <TableCell>
                      {phoneNumber.network.name.replace("_", " ")}
                    </TableCell>
                    <TableCell>
                      <Button
                        key={index}
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          setOpenPopup(true);
                          setIsNew(false);
                          setFormNumber(phoneNumber);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>

      <Popup
        title="Phone Number"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PhoneNumberForm
          item={formNumber}
          setItem={setFormNumber}
          handleSubmit={handleFormSubmit}
        />
      </Popup>

      <Popup title="Error" openPopup={errorPopup} setOpenPopup={setErrorPopup}>
        {errorMessage.map((errorMsg) => {
          return (
            <Typography variant="h6" component="div">
              {errorMsg}
            </Typography>
          );
        })}
      </Popup>
    </>
  );
};

export default PhoneNumberList;
