import { Box, Container } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import TransactionListResults from "../components/Transaction/TransactionListResults";
import TransactionListToolbar from "../components/Transaction/TransactionListToolbar";
import {
  baseUrl,
  isNotFoundResponse,
  NotFoundResponse,
  Transaction,
} from "../data/entities";

interface Props {
  token: string;
}
const transactionUrl: string = baseUrl + "transactions";

const getTransactions = async (token: string) => {
  return fetch(transactionUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const Transactions: FC<Props> = ({ token }) => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions(token).then((data: Transaction[] | NotFoundResponse) => {
      if (!isNotFoundResponse(data)) {
        setTransactionList(data);
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
        <Container maxWidth={false}>
          <TransactionListToolbar
            token={token}
            transactionList={transactionList}
            setTransactionList={setTransactionList}
          />
          <Box sx={{ pt: 3 }}>
            <TransactionListResults transactions={transactionList} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Transactions;
