import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormHelperText,
    Grid,
    TextField,
} from "@material-ui/core";
import React from "react";
import { networkList, PhoneNumber } from "../../data/entities";
import { Select } from "../Controls/Select";

interface PhoneNumberFormProps {
    item: PhoneNumber;
    setItem: React.Dispatch<React.SetStateAction<PhoneNumber>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
    item,
    setItem,
    handleSubmit,
}) => {
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.target.name === "network") {
            setItem({
                ...item,
                network: networkList[Number(event.target.value) - 1],
            });
            return;
        }
        setItem({
            ...item,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="number"
                                onChange={handleChange}
                                required
                                value={item.number}
                                variant="outlined"
                                error={item.number.length !== 10}
                            />
                            <FormHelperText>Eg. 0247555999</FormHelperText>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Select
                                fullWidth
                                required
                                label="Network"
                                name="network"
                                value={item.network}
                                onChange={handleChange}
                                options={networkList}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                    }}
                >
                    <Button color="primary" variant="contained" type="submit">
                        Save Number
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
