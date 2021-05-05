import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { FC } from "react";

interface TotalAmountProps {
    totalAmount: Number;
}

const TotalAmount: FC<TotalAmountProps> = ({ totalAmount }) => (
    <Card>
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
            >
                <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                        TOTAL AMOUNT
                    </Typography>
                    <Typography color="textPrimary" variant="h3">
                        {totalAmount}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: indigo[600],
                            height: 56,
                            width: 56,
                        }}
                    >
                        <AttachMoneyIcon />
                    </Avatar>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default TotalAmount;
