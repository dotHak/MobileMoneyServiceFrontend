import { Box, Container, Grid } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import LatestTransactions from "../components/Dashboard/LatestTransactions";
import TReceived from "../components/Dashboard/Received";
import TSent from "../components/Dashboard/Sent";
import TotalAmount from "../components/Dashboard/TotalAmount";
import TotalTransactions from "../components/Dashboard/TotalTransactions";
import {
  baseUrl,
  isNotFoundResponse,
  NotFoundResponse,
  Transaction,
} from "../data/entities";

interface DashboardProps {
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

const getTransactionsSent = async (token: string) => {
  return fetch(transactionUrl + "/sent", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const getTransactionsReceived = async (token: string) => {
  return fetch(transactionUrl + "/received", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const reducer = (accumulator: number, item: Transaction) => {
  return item.status.name === "SUCCESS"
    ? accumulator + item.price
    : accumulator;
};

const Dashboard: FC<DashboardProps> = ({ token }) => {
  const [totalAmount, SetTotalAmount] = useState(0);
  const [totalSent, SetTotalSent] = useState(0);
  const [totalReceived, SetTotalReceived] = useState(0);
  const [totalTransactions, SetTotalTransactions] = useState(0);
  const [latestTransactions, SetLatestTransactions] = useState<Transaction[]>(
    []
  );

  useEffect(() => {
    getTransactionsSent(token).then(
      (data: Transaction[] | NotFoundResponse) => {
        if (!isNotFoundResponse(data)) {
          const theSum = data.reduce(reducer, 0);
          SetTotalSent(theSum);
        }
      }
    );

    getTransactionsReceived(token).then(
      (data: Transaction[] | NotFoundResponse) => {
        if (!isNotFoundResponse(data)) {
          const theSum = data.reduce(reducer, 0);
          SetTotalReceived(theSum);
        }
      }
    );

    SetTotalAmount(totalSent + totalReceived);
    getTransactions(token).then((data: Transaction[] | NotFoundResponse) => {
      if (!isNotFoundResponse(data)) {
        SetLatestTransactions(data.slice(0, 10));
        SetTotalTransactions(data.length);
      }
    });
  }, []);

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
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TReceived total={totalReceived} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TSent amount={totalSent} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalTransactions totalNumber={totalTransactions} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalAmount totalAmount={totalAmount} />
            </Grid>
            <Grid item md={12}>
              <LatestTransactions transactionList={latestTransactions} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
