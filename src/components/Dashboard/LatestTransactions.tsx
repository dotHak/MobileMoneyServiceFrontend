import moment from "moment";
import {
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { FC } from "react";
import { Transaction } from "../../data/entities";
import { Link as RouterLink } from "react-router-dom";

interface LatestTransactionsProps {
    transactionList: Transaction[];
}

const LatestTransactions: FC<LatestTransactionsProps> = ({
    transactionList,
}) => (
    <Card>
        <CardHeader title="Latest transactions" />
        <Divider />
        <Box sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Received</TableCell>
                        <TableCell>Sender</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell sortDirection="desc">
                            <Tooltip enterDelay={300} title="Sort">
                                <TableSortLabel active direction="desc">
                                    Date
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionList.map((transaction, index) => (
                        <TableRow hover key={transaction.id}>
                            <TableCell>{index + 1}</TableCell>

                            <TableCell>{transaction.receiver.number}</TableCell>
                            <TableCell>{transaction.receiver.number}</TableCell>
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
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
            }}
        >
            <RouterLink to="/app/transactions">
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </RouterLink>
        </Box>
    </Card>
);

export default LatestTransactions;
