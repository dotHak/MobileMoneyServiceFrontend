import { Box, Container } from "@material-ui/core";
import TransactionListToolbar from "../components/Transaction/TransactionListToolbar";
import TransactionListResults from "../components/Transaction/TransactionListResults";

import {
    Transaction,
    NotFoundResponse,
    isNotFoundResponse,
} from "../data/entities";
import { useState, useEffect } from "react";

interface Props {
    token: string;
}
const transactionUrl: string = "http://localhost:8080/api/v1/transactions";

const getTransactions = async (token: string) => {
    return fetch(transactionUrl, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    }).then((data) => data.json());
};

const Transactions = (props: Props) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);

    useEffect(() => {
        getTransactions(props.token).then(
            (data: Transaction[] | NotFoundResponse) => {
                if (!isNotFoundResponse(data)) {
                    setTransactionList(data);
                }
            }
        );
    }, [props.token]);

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
                    <TransactionListToolbar />
                    <Box sx={{ pt: 3 }}>
                        <TransactionListResults
                            transactions={transactionList}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Transactions;
