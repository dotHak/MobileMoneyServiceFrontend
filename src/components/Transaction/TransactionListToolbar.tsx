import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { Search as SearchIcon } from "react-feather";
import {
  baseUrl,
  ErrorResponse,
  isErrorResponse,
  isNotFoundResponse,
  NewTransaction,
  NotFoundResponse,
  PhoneNumber,
  Transaction,
} from "../../data/entities";
import { Popup } from "../Popup/Popup";
import { TransactionForm } from "./TransactionForm";

interface Props {
  token: string;
  setTransactionList: React.Dispatch<React.SetStateAction<Transaction[]>>;
  transactionList: Transaction[];
  backupList: Transaction[];
}
const initialTransaction: NewTransaction = { price: 0, email: "" };

const phoneUrl: string = baseUrl + "phoneNumbers";
const getPhoneNumbers = async (token: string) => {
  return fetch(phoneUrl + "/user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const tranUrl = baseUrl + "transactions";

const saveTransaction = async (token: string, data: NewTransaction) => {
  return fetch(tranUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};

const TransactionListToolbar: FC<Props> = ({
  token,
  setTransactionList,
  transactionList,
  backupList,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [newTransaction, setTransaction] = useState(initialTransaction);
  const [phones, setPhones] = useState<PhoneNumber[]>([]);

  const [errorMessage, setErrorMessage] = useState<String[]>([
    "An error occured!",
  ]);

  useEffect(() => {
    getPhoneNumbers(token).then((data: PhoneNumber[] | NotFoundResponse) => {
      if (!isNotFoundResponse(data)) {
        setPhones(data);
      }
    });
  }, [token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response: Transaction | ErrorResponse = await saveTransaction(
      token,
      newTransaction
    );

    if (isErrorResponse(response)) {
      setErrorMessage(response.errors);
      setErrorPopup(true);
    }

    setOpenPopup(false);
    setTransactionList([...transactionList, response as Transaction]);
    setTransaction(initialTransaction);
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const searchWord = event.target.value.toLowerCase();
    if (searchWord.length === 0) {
      setTransactionList(backupList);
      return;
    }

    const trans: Transaction[] = backupList.filter(
      (value) =>
        value.receiver.number.includes(searchWord) ||
        value.sender.number.includes(searchWord) ||
        value.price.toString().includes(searchWord) ||
        value.status.name.toLocaleLowerCase().includes(searchWord)
    );

    setTransactionList(trans);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpenPopup(true)}
        >
          Transfer
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search transactions"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Popup
          title="Transfer Amount"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          key="transactionForm"
        >
          <TransactionForm
            item={newTransaction}
            setItem={setTransaction}
            phoneNumbers={phones}
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
    </Box>
  );
};

export default TransactionListToolbar;
