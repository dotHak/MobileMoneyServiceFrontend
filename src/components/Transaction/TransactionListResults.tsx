import moment from "moment";
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
import { Transaction } from "../../data/entities";
import React from "react";

interface Props {
    transactions: Transaction[];
}

const TransactionListResults = (props: Props) => {
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
                        {props.transactions.map((transaction, index) => (
                            <TableRow hover key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {transaction.receiver.number}
                                </TableCell>
                                <TableCell>
                                    {transaction.sender.number}
                                </TableCell>
                                <TableCell>{transaction.price}</TableCell>
                                <TableCell>
                                    {moment(transaction.createdDate).format(
                                        "DD/MM/YYYY"
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
