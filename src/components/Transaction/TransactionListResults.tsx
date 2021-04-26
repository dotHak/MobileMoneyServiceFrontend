import moment from "moment";
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { Transaction } from "../../entities";

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
                            <TableCell>Receiver</TableCell>
                            <TableCell>Sender</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.transactions.map((transaction, index) => (
                            <TableRow hover key={index}>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

export default TransactionListResults;
