import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { Merchant } from "../../data/entities";

interface MerchantListProps {
  merchants: Merchant[];
  setFormMerchant: React.Dispatch<React.SetStateAction<Merchant>>;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MerchantList: React.FC<MerchantListProps> = ({
  merchants,
  setFormMerchant,
  setOpenPopup,
}) => {
  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {merchants.map((merchant, index) => (
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{merchant.name}</TableCell>
                <TableCell>{merchant.email}</TableCell>
                <TableCell>{merchant.address}</TableCell>
                <TableCell>{merchant.region}</TableCell>
                <TableCell>{merchant.city}</TableCell>
                <TableCell>
                  {moment(merchant.createdDate).format(
                    "ddd MMMM Do, YYYY HH:mm:ss"
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setOpenPopup(true);
                      setFormMerchant(merchant);
                    }}
                    color="secondary"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};
