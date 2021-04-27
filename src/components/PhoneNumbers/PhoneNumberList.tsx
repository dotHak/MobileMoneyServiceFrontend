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
} from "@material-ui/core";
import React from "react";

import { PhoneNumber } from "../../data/entities";

interface Props {
    phoneNumberList: PhoneNumber[];
}

const PhoneNumberList = (props: Props) => {
    return (
        <Card>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                }}
            >
                <Button color="primary" variant="contained">
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
                        {props.phoneNumberList.map((phoneNumber, index) => {
                            return (
                                <TableRow hover key={phoneNumber.id}>
                                    <TableCell>{phoneNumber.number}</TableCell>
                                    <TableCell>
                                        {phoneNumber.network.name.replace(
                                            " ",
                                            "_"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            key={index}
                                            color="secondary"
                                            variant="contained"
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
    );
};

export default PhoneNumberList;
