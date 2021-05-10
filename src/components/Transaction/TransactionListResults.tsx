import {
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Transaction } from "../../data/entities";

interface Props {
  transactions: Transaction[];
}

const TransactionListResults: React.FC<Props> = ({ transactions }) => {
  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{transaction.receiver.number}</TableCell>
                <TableCell>{transaction.sender.number}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                <TableCell>
                  {moment(transaction.createdDate).format(
                    "ddd MMMM Do, YYYY HH:mm:ss"
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={transaction.status.name}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default TransactionListResults;
